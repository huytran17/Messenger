import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { DrawerLeft, DrawerRight, Bar, BottomNav } from "./index";

export default function Main({ children, ...rest }) {
  return (
    <>
      <Box sx={{ display: "flex" }} {...rest}>
        <CssBaseline />
        <Bar />
        <DrawerLeft />
        <Box component="main" sx={{ width: "100%", marginBottom: 10 }}>
          {children}
        </Box>
        <DrawerRight />
        <BottomNav />
      </Box>
    </>
  );
}
