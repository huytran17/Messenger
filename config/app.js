require("dotenv").config();

const env = process.env;

module.exports = {
  APP_NAME: env.APP_NAME || "NODEJS CHAT APP",
  APP_MAIL: env.APP_MAIL,
  APP_URL: env.APP_URL || "http://localhost:3000",
  DATABASE_URL: env.DATABASE_URL,
  SERVER_PORT: env.SERVER_PORT || 3000,
  TOKEN_SECRET: env.TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET,
  TOKEN_LIFE: env.TOKEN_LIFE || 60,
  REFRESH_TOKEN_LIFE: env.REFRESH_TOKEN_LIFE || 120,
};
