import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatusLeft,
  toggleStatusLeft,
} from "../../app/slices/appBarSlice";
import { selectData } from "../../app/slices/userSlice";
import {
  selectConversation,
  getConversationAsync,
} from "../../app/slices/conversationSlice";
import { STRING, View } from "../../constants/index";
import { ConvAvatar, GrpAvatar } from "../index";

const drawerWidth = View.DRAWER_WIDTH;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    border: 0,
  },
  "& .MuiPaper-root > div": {
    minHeight: `${View.APPBAR_HEIGHT}px`,
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerLeft() {
  const status = useSelector(selectStatusLeft);

  const dispatch = useDispatch();

  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(toggleStatusLeft());
  };

  const user = useSelector(selectData);

  const conversation = useSelector(selectConversation);

  const openConversation = (event) => {
    const cid = event.currentTarget.getAttribute("data-cid");

    dispatch(getConversationAsync(cid));
  };

  console.log(conversation);

  return (
    <Drawer variant="permanent" open={status}>
      <DrawerHeader sx={{ justifyContent: "start", padding: 0 }}>
        <ListItem button key="chevron" onClick={handleDrawerClose}>
          <ListItemIcon>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="Hide" />
        </ListItem>
      </DrawerHeader>
      <List>
        {user.convs
          ? user.convs.map((conv) => {
              const mem = conv.mems.filter((mem) => mem._id !== user._id).pop();

              return (
                <ListItem
                  button
                  key={conv._id}
                  data-cid={conv._id}
                  onClick={openConversation}
                >
                  <ListItemIcon>
                    <ConvAvatar
                      src={
                        mem.avatar_photo
                          ? "data:image/*;base64," + mem.avatar_photo
                          : STRING.EMPTY
                      }
                      alt={mem.username}
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={mem.username} />
                </ListItem>
              );
            })
          : STRING.EMPTY}
      </List>
      <Divider />
      <List>
        {user.grs
          ? user.grs.map((gr) => {
              return (
                <ListItem button key={gr._id}>
                  <ListItemIcon>
                    <GrpAvatar
                      src={
                        gr.background_photo
                          ? "data:image/*;base64," + gr.background_photo
                          : STRING.EMPTY
                      }
                      srcSmall={
                        "data:image/*;base64," + gr.createdBy.avatar_photo
                      }
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={gr.name} />
                </ListItem>
              );
            })
          : STRING.EMPTY}
      </List>
    </Drawer>
  );
}
