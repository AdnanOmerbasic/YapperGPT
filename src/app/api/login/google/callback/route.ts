import { decodeIdToken } from 'arctic';

import { cookies } from 'next/headers';
import { createGoogleUser } from '@/features/auth/queries/createGoogleUser';
import { getUserFromGoogleId } from '@/features/auth/queries/getUserFromGoogleId';
import { createSession } from '@/features/auth/utils/session';
import { setSessionCookie } from '@/features/auth/utils/session-cookies';
import { google } from '@/lib/oAuth';
import generateSessionToken from '@/utils/crypto';

import type { OAuth2Tokens } from 'arctic';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('google_oauth_state')?.value ?? null;
  const codeVerifier = cookieStore.get('google_code_verifier')?.value ?? null;
  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch {
    return new Response(null, {
      status: 400,
    });
  }
  const claims = decodeIdToken(tokens.idToken()) as {
    sub: string;
    email: string;
  };
  const googleUserId = claims.sub;
  const email = claims.email;

  const existingUser = await getUserFromGoogleId(googleUserId);

  if (existingUser !== null) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    await setSessionCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/chat',
      },
    });
  }

  console.log(
    'Creating new Google user with ID:',
    googleUserId,
    'and email:',
    email
  );
  const user = await createGoogleUser(googleUserId, email);

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionCookie(sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/chat',
    },
  });
}
