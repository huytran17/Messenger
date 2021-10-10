import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import React from "react";
import { Action, Content, Media, ProfileHeader, ProfileTab } from "./index";
import { View } from "../../../constants/index";

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
    margin: `-${View.AVATAR_SIZE / 2.2}px 0 ${View.AVATAR_SIZE / 4.8}px 0`,
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
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <ProfileTab />
            </CardContent>
          </Collapse>
        </Card>
      </BoxContainer>
    </Box>
  );
}
