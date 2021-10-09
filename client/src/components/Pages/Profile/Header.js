import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectData } from "../../../app/slices/userSlice";

const avatarSize = 80;

const Header = styled(CardHeader)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",

  ...theme.mixins.toolbar,
}));

export default function ProfileHeader({ ...props }) {
  var user = useSelector(selectData);

  return (
    <Header
      avatar={
        <Avatar
          sx={{
            bgcolor: red[500],
            width: avatarSize,
            height: avatarSize,
          }}
          aria-label="recipe"
          src={"data:image/*;base64," + user.avatar_photo}
          alt={user.username}
        ></Avatar>
      }
      title={user.username}
      subheader={user.bio}
      {...props}
    />
  );
}
