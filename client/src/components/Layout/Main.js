import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { DrawerLeft, DrawerRight, Bar, BottomNav } from "./index";
import { View } from "../../constants/index";

export default function Main({ children, ...rest }) {
  return (
    <>
      <Box sx={{ display: "flex" }} {...rest}>
        <CssBaseline />
        <Bar />
        <DrawerLeft />
        <Box
          component="main"
          sx={{
            width: "100%",
            marginBottom: `${View.BOTTOM_NAV_HEIGHT + 20}px`,
            "& > .MuiBox-root": {
              padding: "5px",
            },
          }}
        >
          {children}
        </Box>
        <DrawerRight />
        <BottomNav />
      </Box>
    </>
  );
}
