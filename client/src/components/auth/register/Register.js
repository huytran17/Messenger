import Box from "@mui/material/Box";
import * as React from "react";
import { Form } from "./index";
import PanelImage from "../../../static/images/registerPanel.jpg";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

export default function Login({ panelImage }) {
  const BoxContainer = styled(Box)({
    "& > :not(style)": { m: 1 },
    margin: "30px auto auto auto",
    width: "650px",
    height: "650px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "999px",
    overflow: "hidden",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    backgroundImage: `url(${panelImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  });

  return (
    <BoxContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 9,
        }}
      >
        <Form />
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
