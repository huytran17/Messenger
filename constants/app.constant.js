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
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
});

const ResponseMessage = Object.freeze({
  EMAIL_ALREADY_EXISTS: "Email đã tồn tại trong hệ thống.",
  INCORRECT_EMAIL: "Email không chính xác.",
  INCORRECT_PASSWORD: "Mật khẩu không chính xác.",
  UNAUTHORIZED_ACCESS: "UNAUTHORIZED ACCESS",
  SEND_MAIL_ERROR: "Không thể gửi email vào lúc này, bạn vui lòng thử lại sau.",
  USER_NOT_FOUND: "Không tìm thấy thông tin tài khoản.",
  MAIL_SENT:
    "Một E-mail đã được gửi đến địa chỉ E-mail của bạn. Vui lòng kiểm tra và làm theo hướng dẫn.",
  VERIFY_CODE_INVALID: "Mã xác thực không đúng hoặc đã hết hạn.",
  INTERNAL_SERVER_ERROR: "INTERNAL SERVER ERROR.",
  FORBIDDEN: "Không có quyền truy cập.",
});

const ValidationMessage = Object.freeze({
  REQUIRED: "Không được để trống.",
  STRING_BASE: "Phải có định dạng kiểu chuỗi.",
  MIN: `Tối thiểu {#limit} ký tự.`,
  MAX: `Tối đa {#limit} ký tự.`,
  TYPE_EMAIL: "Không đúng định dạng.",
  MISMATCH_REPWD: "Mật khẩu nhập lại không khớp.",
  MIME_TYPE: "File không đúng định dạng.",
  IMAGE_SIZE: "Kích thước tối đa 1MB",
  INVALID: "Dữ liệu không hợp lệ.",
  NUMBER_BASE: "Phải có định dạng kiểu số.",
  NUMBER_INFINITY: "Vượt quá giá trị cho phép.",
  DATE_BASE: "Phải có định dạng đ/mm/yyyy",
});

const Path = Object.freeze({
  EMAIL: "email",
  PASSWORD: "password",
  VERIFY_CODE: "verify_code",
});

const FileUpload = Object.freeze({
  IMAGE_MAX_SIZE: 1048576,
  FILE_MAX_SIZE: 1048576,
});

module.exports.HttpStatus = HttpStatus;
module.exports.ResponseMessage = ResponseMessage;
module.exports.ValidationMessage = ValidationMessage;
module.exports.Path = Path;
module.exports.FileUpload = FileUpload;
