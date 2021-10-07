import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";

const avatarSize = 80;

const Header = styled(CardHeader)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",

  ...theme.mixins.toolbar,
}));

export default function ProfileHeader({ ...props }) {
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
        >
          R
        </Avatar>
      }
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
      {...props}
    />
  );
}
