import Box from "@mui/material/Box";
import * as React from "react";
import { Footer, Form, Header, SideImage } from "./index";
import PanelImage from "../../../static/images/loginPanel.jpg";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

export default function Login({ panelImage }) {
  const BoxContainer = styled(Box)({
    "& > :not(style)": { m: 1 },
    margin: "30px auto auto auto",
    width: "800px",
    height: "600px",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  });

  return (
    <BoxContainer>
      <SideImage />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 9,
          backgroundImage: `url(${panelImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <Form />
        <Footer />
      </Box>
    </BoxContainer>
  );
}

Login.prototype = {
  panelImage: PropTypes.string,
};

Login.defaultProps = {
  panelImage: PanelImage,
};
