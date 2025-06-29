import { generateRandomString } from '@oslojs/crypto/random';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import type { RandomReader } from '@oslojs/crypto/random';

export default function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

const random: RandomReader = {
  read(bytes) {
    crypto.getRandomValues(bytes);
  },
};

const OTP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

export const generateRandomOTP = () => {
  return generateRandomString(random, OTP, 6);
};
