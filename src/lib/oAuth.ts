import { Google } from 'arctic';

const redirectURI =
  process.env.GOOGLE_REDIRECT_URI_DEV ?? process.env.GOOGLE_REDIRECT_URI_PROD;
if (
  !redirectURI ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET
) {
  throw new Error('Google OAuth environment variables are not set correctly.');
}
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  redirectURI
);
