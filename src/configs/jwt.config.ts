const JWT_ACCESS_TOKEN_LONG_LIFE_IN_MIN = 15;
const JWT_REFRESH_TOKEN_LONG_LIFE_IN_DAYS = 7;

export const getAccessTokenLongLife = () => {
  return JWT_ACCESS_TOKEN_LONG_LIFE_IN_MIN;
};

export const getRefreshTokenLongLife = () => {
  return JWT_REFRESH_TOKEN_LONG_LIFE_IN_DAYS;
};

export const getRefreshTokenExpiredDate = () => {
  return new Date(
    new Date().getTime() +
      JWT_REFRESH_TOKEN_LONG_LIFE_IN_DAYS * 24 * 60 * 60 * 1000,
  );
};
