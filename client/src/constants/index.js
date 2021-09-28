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

export const _String = Object.freeze({
  EMPTY: "",
  formFields: {
    USERNAME: "username",
    EMAIL: "email",
    PASSWORD: "password",
    RE_PASSWORD: "re_password",
  },
});

export const Reducer = Object.freeze({
  NAME: {
    AUTH: "AUTH",
    APPBAR: "APPBAR",
  },
});

export const Action = Object.freeze({
  TYPE: {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
  },
});

export const Server = Object.freeze({
  PORT: 8000,
  URL: "http://localhost",
});
