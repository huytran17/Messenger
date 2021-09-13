const HttpStatus = Object.freeze({
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
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
});

const ResponseMessage = Object.freeze({
  EMAIL_ALREADY_EXISTS: "Email đã tồn tại trong hệ thống.",
  INCORRECT_EMAIL: "Email không chính xác.",
  INCORRECT_PASSWORD: "Mật khẩu không chính xác.",
});

const ValidationMessage = Object.freeze({
  REQUIRED: "Không được để trống.",
  STRING_BASE: "Phải có định dạng kiểu chuỗi.",
  MIN: `Tối thiểu {#limit} ký tự.`,
  MAX: `Tối đa {#limit} ký tự.`,
  TYPE_EMAIL: "Không đúng định dạng.",
  MISMATCH_REPWD: "Mật khẩu nhập lại không khớp.",
});

module.exports.HttpStatus = HttpStatus;
module.exports.ResponseMessage = ResponseMessage;
module.exports.ValidationMessage = ValidationMessage;
