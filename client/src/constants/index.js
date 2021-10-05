export const ValidateCond = Object.freeze({
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 6,
});

export const ValidateError = Object.freeze({
  INVALID_EMAIL: "Không đúng định dạng.",
  REQUIRED: "Bắt buộc.",
  MISMATCH: "Không khớp.",
  PASSWORD_MIN_LENGTH: `Tối thiểu ${ValidateCond.PASSWORD_MIN_LENGTH} ký tự.`,
  USERNAME_MIN_LENGTH: `Tối thiểu ${ValidateCond.USERNAME_MIN_LENGTH} ký tự.`,
});

export const STRING = Object.freeze({
  EMPTY: "",
});

export const Field = Object.freeze({
  USERNAME: "username",
  EMAIL: "email",
  PASSWORD: "password",
  RE_PASSWORD: "re_password",
  VERIFY_CODE: "verify_code",
  RESET_PWD: "RESET_PWD",
});

export const Reducer = Object.freeze({
  NAME: {
    AUTH: "AUTH",
    AUTH_FORM: "AUTH_FORM",
    APPBAR: "APPBAR",
    ALERT: "ALERT",
  },
});

export const Auth = Object.freeze({
  TYPE: {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    FORGET_PWD: "FORGET_PWD",
    RESET_PWD: "RESET_PWD",
    VERIFY_CODE: "VERIFY_CODE",
  },
});

export const Server = Object.freeze({
  PORT: 8000,
  URL: "http://localhost",
});

export const Message = Object.freeze({
  ALERT: {
    TITLE: {
      SUCCSESS: "Success!",
    },
    MESSAGE: {
      MAIL_SENT:
        "Một email đã được gửi đến địa chỉ E-mail của bạn. Bạn vui lòng kiểm tra và làm theo hướng dẫn.",
    },
  },
});

export const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  REQUEST_TIMEOUT: 407,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
});

export const View = Object.freeze({
  DRAWER_WIDTH: 220,
  BOTTOM_NAV_HEIGHT: 56,
  APPBAR_HEIGHT: 56,
});
