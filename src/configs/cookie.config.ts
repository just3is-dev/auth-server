import { CookieOptions } from 'express';

export const REFRESH_TOKEN_COOKIE = 'refreshToken';

export const getCookieOptions = (expires?: Date): CookieOptions => ({
  expires,
  sameSite: 'strict',
  httpOnly: true,
  secure: true,
});
