import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectData, selectIsLoading } from "../../../app/slices/userSlice";
import { STRING } from "../../../constants/index";
import { Typography } from "@mui/material";
import { View } from "../../../constants/index";
import Skeleton from "@mui/material/Skeleton";

const Header = styled(CardHeader)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",

  ...theme.mixins.toolbar,
}));

export default function ProfileHeader({ ...props }) {
  const user = useSelector(selectData);

  const isLoading = useSelector(selectIsLoading);

  return (
    <Header
      avatar={
        isLoading ? (
          <Skeleton
            variant="circular"
            width={View.AVATAR_SIZE}
            height={View.AVATAR_SIZE}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: red[500],
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
        )
      }
      title={
        isLoading ? (
          <Skeleton variant="text" width={200} />
        ) : (
          <Typography variant="h6" gutterBottom component="div">
            {user.username + " (" + user.nickname + ")"}
          </Typography>
        )
      }
      subheader={isLoading ? <Skeleton variant="text" width={200} /> : user.bio}
      {...props}
    />
  );
}
