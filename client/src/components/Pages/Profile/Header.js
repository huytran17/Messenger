import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectData, selectIsLoading } from "../../../app/slices/userSlice";
import { STRING, View } from "../../../constants/index";
import React, { useState } from "react";
import { UploadAvatar } from "./index";

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

export default function ProfileHeader({ ...props }) {
  const user = useSelector(selectData);

  const isLoading = useSelector(selectIsLoading);

  const [isShowFormUpload, setShowFormUpload] = useState(false);

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
              badgeContent={
                <SmallCamera onClick={() => setShowFormUpload(true)} />
              }
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
      <UploadAvatar isShow={isShowFormUpload} handleShow={setShowFormUpload} />
    </>
  );
}
