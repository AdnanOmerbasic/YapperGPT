import { hash, verify } from '@node-rs/argon2';

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, {
    memoryCost: 32758,
    timeCost: 2,
    parallelism: 1,
    outputLen: 32,
  });
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await verify(hashedPassword, password);
  return isValid;
};
