require("dotenv").config();

const env = process.env;

module.exports = {
  APP_NAME: env.APP_NAME || "NODEJS CHAT APP",
  APP_MAIL: env.APP_MAIL,
  APP_URL: env.APP_URL || "http://localhost:3000",
  DATABASE_URL: env.DATABASE_URL,
  SERVER_PORT: env.SERVER_PORT || 3000,
  TOKEN_SECRET: env.TOKEN_SECRET,
  SESSION_SECRET: env.SESSION_SECRET,
  COOKIE_SECRET: env.COOKIE_SECRET,
  COOKIE_TOKEN_EXPIRES: 15 * 24 * 60 * 60 * 1000, // 15 days
  COOKIE_VERIFY_EXPIRES: 15 * 60 * 1000, // 15 minutes
  MAIL_HOST: env.MAIL_HOST || "smtp.gmail.com",
  MAIL_PORT: env.MAIL_PORT || 465,
  MAIL_SECURE: env.MAIL_SECURE || true,
  MAIL_USER: env.MAIL_USER,
  MAIL_PWD: env.MAIL_PWD,
  MAIL_FROM: env.MAIL_FROM,
  MAIL_ONCHANGE_SUBJECT: "Xác nhận thay đổi địa chỉ E-mail",
  MAIL_DOMAIN: env.MAIL_DOMAIN,
  MAIL_API_KEY: env.MAIL_API_KEY,
};
