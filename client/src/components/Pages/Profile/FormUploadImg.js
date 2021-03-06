import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFileError,
  selectFileError,
  validateFile,
} from "../../../app/slices/uploadImgSlice";
import { selectData } from "../../../app/slices/userSlice";
import { STRING, View } from "../../../constants/index";
import { CommonTextField } from "../../index";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FormUploadImg({
  submitBtnLabel,
  cancelBtnLabel,
  uploadTitle,
  isOpen,
  handleClose,
  changeImg,
  ...props
}) {
  const dispatch = useDispatch();

  const user = useSelector(selectData);

  const fileError = useSelector(selectFileError);

  const [fileChoosen, setFileChoosen] = useState(null);

  const handleCloseFormUpload = () => {
    handleClose();

    setFileChoosen(null);

    dispatch(resetFileError());
  };

  const onChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileChoosen(file);

      dispatch(validateFile({ type: file.type, size: file.size }));
    } else {
      setFileChoosen(null);

      dispatch(validateFile(null));
    }
  };

  const updateImg = (event) => {
    if (fileChoosen && !fileError.hasError) changeImg(fileChoosen);
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseFormUpload} {...props}>
      <DialogTitle>{uploadTitle}</DialogTitle>
      <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          sx={{
            width: View.AVATAR_SIZE * 3,
            height: View.AVATAR_SIZE * 3,
          }}
          variant="square"
          aria-label="recipe"
          src={fileChoosen ? URL.createObjectURL(fileChoosen) : STRING.EMPTY}
          alt={user.username}
        ></Avatar>
      </DialogContent>
      <DialogContent>
        <CommonTextField
          margin="dense"
          type="file"
          onChange={onChange}
          fullWidth
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFormUpload}>{cancelBtnLabel}</Button>
        <Button onClick={updateImg}>{submitBtnLabel}</Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={fileError.hasError}
        key="topcenter"
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {fileError.error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

FormUploadImg.propTypes = {
  uploadTitle: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  submitBtnLabel: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  changeImg: PropTypes.func,
};

FormUploadImg.defaultProps = {
  uploadTitle: "Upload your avatar",
  cancelBtnLabel: "Cancel",
  submitBtnLabel: "Okay",
  isOpen: false,
};
