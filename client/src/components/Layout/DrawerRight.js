import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatusRight,
  toggleStatusRight,
} from "../../app/slices/appBarSlice";

const drawerWidth = 200;

export default function TemporaryDrawer() {
  const status = useSelector(selectStatusRight);

  const dispatch = useDispatch();

  const list = () => (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={status}
      onClose={() => dispatch(toggleStatusRight())}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          border: 0,
        },
        [`& .MuiToolbar-root`]: {
          minHeight: "48px",
        },
      }}
    >
      <Toolbar />
      {list()}
    </Drawer>
  );
}
