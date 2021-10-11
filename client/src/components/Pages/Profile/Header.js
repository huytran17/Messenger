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
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectData, selectIsLoading } from "../../../app/slices/userSlice";
import { STRING, View } from "../../../constants/index";

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

export default function ProfileHeader({
  submitBtnLabel,
  cancelBtnLabel,
  uploadTitle,
  ...props
}) {
  const user = useSelector(selectData);

  const isLoading = useSelector(selectIsLoading);

  const [isShowFormUpload, setShowFormUpload] = useState(false);

  const handleOpenFormUpload = () => {
    setShowFormUpload(true);
  };

  const handleCloseFormUpload = () => {
    setShowFormUpload(false);
  };

  const onChange = (event) => {
    console.log(event.target.files[0]);
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
            <Skeleton variant="text" width={200} />
          ) : (
            <Typography variant="h6" gutterBottom component="div">
              {user.username +
                (user.nickname ? " (" + user.nickname + ")" : STRING.EMPTY)}
            </Typography>
          )
        }
        subheader={
          isLoading ? <Skeleton variant="text" width={200} /> : user.bio
        }
        {...props}
      />

      <Dialog open={isShowFormUpload} onClose={handleCloseFormUpload}>
        <DialogTitle>{uploadTitle}</DialogTitle>
        <DialogContent>
          <Avatar
            sx={{
              width: View.AVATAR_SIZE * 2,
              height: View.AVATAR_SIZE * 2,
            }}
            variant="square"
            aria-label="recipe"
            src={
              user.avatar_photo
                ? "data:image/*;base64," + user.avatar_photo
                : STRING.EMPTY
            }
            alt={user.username}
          ></Avatar>
        </DialogContent>
        <DialogContent>
          <TextField margin="dense" type="file" onChange={onChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormUpload}>{cancelBtnLabel}</Button>
          <Button onClick={handleCloseFormUpload}>{submitBtnLabel}</Button>
        </DialogActions>
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
