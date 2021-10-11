import { DropzoneDialog } from "material-ui-dropzone";
import PropTypes from "prop-types";
import React from "react";

const UploadAvatar = ({
  submitBtnLabel,
  cancelBtnLabel,
  maxFileSize,
  filesLimit,
  isShow,
  handleShow,
  ...rest
}) => {
  return (
    <DropzoneDialog
      acceptedFiles={["image/*"]}
      cancelButtonText={cancelBtnLabel}
      submitButtonText={submitBtnLabel}
      maxFileSize={maxFileSize}
      open={isShow}
      filesLimit={filesLimit}
      onClose={() => handleShow(false)}
      onSave={(files) => {
        console.log("Files:", files);
        handleShow(false);
      }}
      showPreviews={true}
      showFileNamesInPreview={true}
      {...rest}
    />
  );
};

UploadAvatar.propTypes = {
  uploadTitle: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  submitBtnLabel: PropTypes.string,
  maxFileSize: PropTypes.number,
  filesLimit: PropTypes.number,
  isShow: PropTypes.bool,
  handleShow: PropTypes.func,
};

UploadAvatar.defaultProps = {
  uploadTitle: "Upload your avatar",
  cancelBtnLabel: "Cancel",
  submitBtnLabel: "Change",
  maxFileSize: 1048576,
  filesLimit: 1,
  isShow: false,
};

export default UploadAvatar;
