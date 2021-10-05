import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatusRight,
  toggleStatusRight,
} from "../../app/slices/appBarSlice";
import { View } from "../../constants/index";

const drawerWidth = View.DRAWER_WIDTH - 20;

export default function TemporaryDrawer() {
  const status = useSelector(selectStatusRight);

  const dispatch = useDispatch();

  const features = ["Friend requests", "Friends"];

  const expands = ["COVID-19", "News", "About", "Feedback"];

  const list = () => (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {features.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {expands.map((text, index) => (
          <ListItem button key={text}>
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
