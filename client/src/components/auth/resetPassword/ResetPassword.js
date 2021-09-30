import Box from "@mui/material/Box";
import * as React from "react";
import { Form } from "./index";
import PanelImage from "../../../images/loginPanel.jpg";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { AppAlert } from "../../index";

export default function ForgetPwd({ panelImage }) {
  const BoxContainer = styled(Box)({
    "& > :not(style)": { m: 1 },
    margin: "30px auto auto auto",
    width: "500px",
    height: "auto",
    maxHeight: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
  });

  return (
    <BoxContainer>
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
        <AppAlert severity="success" color="info" sx={{ marginBottom: 3 }} />
        <Form />
      </Box>
    </BoxContainer>
  );
}

ForgetPwd.prototype = {
  panelImage: PropTypes.string,
};

ForgetPwd.defaultProps = {
  panelImage: PanelImage,
};
