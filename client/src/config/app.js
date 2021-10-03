export const CONF = Object.freeze({
  TOKEN_SECRET: process.env.REACT_APP_TOKEN_SECRET,
  TOKEN_EXPIRES: process.env.REACT_APP_TOKEN_EXPIRES || 15, // 15 days
});
