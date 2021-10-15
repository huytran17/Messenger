import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectData,
  selectIsLoading,
  setData,
  setError,
} from "../../../app/slices/userSlice";
import { STRING, View, Server } from "../../../constants/index";
import { CommonTextField } from "../../index";
import {
  resetFileError,
  setFileError,
  selectFileError,
  validateFile,
} from "../../../app/slices/uploadImgSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Header = styled(CardHeader)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",

  ...theme.mixins.toolbar,
}));

const SmallCamera = styled(CameraAltIcon)(({ theme }) => ({
  display: "none",
}));

const BadgeContainer = styled(Badge)(({ theme }) => ({
  "&:hover": {
    "& .MuiSvgIcon-root": {
      display: "block",
    },
  },
}));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const skeletonWidth = 200;

export default function ProfileHeader({
  submitBtnLabel,
  cancelBtnLabel,
  uploadTitle,
  ...props
}) {
  const dispatch = useDispatch();

  const user = useSelector(selectData);

  const isLoading = useSelector(selectIsLoading);

  const fileError = useSelector(selectFileError);

  const [isShowFormUpload, setShowFormUpload] = useState(false);

  const [fileChoosen, setFileChoosen] = useState(null);

  const handleOpenFormUpload = () => {
    setShowFormUpload(true);
  };

  const handleCloseFormUpload = () => {
    setShowFormUpload(false);

    dispatch(resetFileError());
  };

  const onChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileChoosen(file);

      dispatch(validateFile({ type: file.type, size: file.size }));
    } else dispatch(validateFile(null));
  };

  const changeAvatar = async (event) => {
    if (fileChoosen && !fileError.hasError) {
      console.log(fileChoosen);
      console.log(fileError.hasError);
      const bodyFormData = new FormData();

      bodyFormData.append("avatar_photo", fileChoosen);

      await axios({
        method: "post",
        url: `${Server.URL}:${Server.PORT}/users/${user._id}`,
        data: bodyFormData,
      })
        .then((res) => {
          window.location.reload();
        })
        .catch((e) => {
          if (e.response)
            dispatch(
              setError({
                path: e.response.data.path,
                error: e.response.data.errors,
              })
            );
        });
    }
  };

  return (
    <>
      <Header
        avatar={
          isLoading ? (
            <Skeleton
              variant="circular"
              width={View.AVATAR_SIZE}
              height={View.AVATAR_SIZE}
            />
          ) : (
            <BadgeContainer
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<SmallCamera onClick={handleOpenFormUpload} />}
            >
              <Avatar
                sx={{
                  width: View.AVATAR_SIZE,
                  height: View.AVATAR_SIZE,
                }}
                aria-label="recipe"
                src={
                  user.avatar_photo
                    ? "data:image/*;base64," + user.avatar_photo
                    : STRING.EMPTY
                }
                alt={user.username}
              ></Avatar>
            </BadgeContainer>
          )
        }
        title={
          isLoading ? (
            <Skeleton variant="text" width={skeletonWidth} />
          ) : (
            <Typography variant="h6" gutterBottom component="div">
              {user.username +
                (user.nickname ? " (" + user.nickname + ")" : STRING.EMPTY)}
            </Typography>
          )
        }
        subheader={
          isLoading ? (
            <Skeleton variant="text" width={skeletonWidth} />
          ) : (
            user.bio
          )
        }
        {...props}
      />

      <Dialog open={isShowFormUpload} onClose={handleCloseFormUpload}>
        <DialogTitle>{uploadTitle}</DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            sx={{
              width: View.AVATAR_SIZE * 2,
              height: View.AVATAR_SIZE * 2,
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
          <Button onClick={changeAvatar}>{submitBtnLabel}</Button>
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
    </>
  );
}

ProfileHeader.propTypes = {
  uploadTitle: PropTypes.string,
  cancelBtnLabel: PropTypes.string,
  submitBtnLabel: PropTypes.string,
};

ProfileHeader.defaultProps = {
  uploadTitle: "Upload your avatar",
  cancelBtnLabel: "Cancel",
  submitBtnLabel: "Okay",
};
