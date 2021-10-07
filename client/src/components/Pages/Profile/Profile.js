import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Action, CollapseTab, Content, Media, ProfileHeader } from "./index";

const avatarSize = 80;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  "& .MuiCardHeader-avatar": {
    margin: `-${avatarSize / 2.2}px 0 ${avatarSize / 4.8}px 0`,
  },
  "& .MuiCardHeader-root": {
    paddingTop: 0,
  },

  ...theme.mixins.toolbar,
}));

export default function ProfilePage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DrawerHeader />
      <BoxContainer>
        <Card sx={{ width: "800px", margin: "0 auto" }}>
          <Media />
          <ProfileHeader />
          <Content />
          <Action handleExpandClick={handleExpandClick} expanded={expanded} />
          <CollapseTab expanded={expanded} />
        </Card>
      </BoxContainer>
    </Box>
  );
}
