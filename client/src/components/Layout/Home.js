import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { DrawerLeft, DrawerRight, Bar, ChatFrame, BottomNav } from "./index";

export default function Home() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Bar />
        <DrawerLeft />
        <ChatFrame />
        <DrawerRight />
      </Box>
      <BottomNav />
    </>
  );
}
