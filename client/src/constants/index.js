export const ValidateError = Object.freeze({
  INVALID_EMAIL: "Không đúng định dạng.",
  REQUIRED: "Bắt buộc.",
  MISMATCH: "Không khớp.",
});

export const _String = Object.freeze({
  EMPTY: "",
  formFields: {
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
