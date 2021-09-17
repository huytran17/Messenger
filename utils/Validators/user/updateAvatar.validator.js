const { validateMIMEType } = require("validate-image-type");

module.exports = (source) => {
  return validateMIMEType(source, {
    allowMimeTypes: [
      "image/jpeg",
      "image/gif",
      "image/png",
      "image/svg+xml",
      "image/x-icon",
      "image/webp",
    ],
  });
};
