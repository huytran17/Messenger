import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { DrawerLeft, DrawerRight, Bar, BottomNav } from "./index";

export default function Main({ children }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Bar />
        <DrawerLeft />
        {children}
        <DrawerRight />
        <BottomNav />
      </Box>
    </>
  );
}
