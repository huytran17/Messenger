import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStatusLeft,
  selectStatusRight,
  toggleStatusLeft,
  toggleStatusRight
} from "../../app/slices/appBarSlice";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Bar() {
  const statusLeft = useSelector(selectStatusLeft);

  const statusRight = useSelector(selectStatusRight);

  const dispatch = useDispatch();

  const handleDrawerOpenLeft = () => {
    dispatch(toggleStatusLeft());
  };

  const handleDrawerOpenRight = () => {
    dispatch(toggleStatusRight());
  };

  return (
    <AppBar position="fixed" open={statusLeft}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpenLeft}
          edge="start"
          sx={{
            marginRight: "36px",
            ...(statusLeft && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, margin: "auto" }}
        >
          Mini variant drawer
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpenRight}
          edge="end"
          sx={{
            ...statusRight,
          }}
        >
          <MenuOpenIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
