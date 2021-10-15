import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectData,
  selectIsLoading,
  setError,
} from "../../../app/slices/userSlice";
import { STRING, View, Server } from "../../../constants/index";
import { FormUploadImg } from "./index";
import axios from "axios";
import { useDispatch } from "react-redux";

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

  const [isShowFormUpload, setShowFormUpload] = useState(false);

  const handleOpenFormUpload = () => {
    setShowFormUpload(true);
  };

  const handleCloseFormUpload = () => {
    setShowFormUpload(false);
  };

  const changeAvatar = async (fileChoosen) => {
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
      <FormUploadImg
        isOpen={isShowFormUpload}
        handleClose={handleCloseFormUpload}
        changeImg={changeAvatar}
      />
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
