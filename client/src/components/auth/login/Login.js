import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Header, Footer, Image, Form } from "./index";

export default function Login() {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        border: "1px solid red",
        margin: "50px auto auto auto",
        width: "500px",
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
      }}
      noValidate
      autoComplete="off"
    >
      <Image />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header />
        <Form />
        <Footer />
      </Box>
    </Box>
  );
}
