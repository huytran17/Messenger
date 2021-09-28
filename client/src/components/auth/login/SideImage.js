import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import PanelImage from "../../../images/loginView.jpg";

export default function SideImage({ panelImage }) {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundImage: `url(${panelImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></Box>
  );
}

SideImage.propTypes = {
  panelImage: PropTypes.string,
};

SideImage.defaultProps = {
  panelImage: PanelImage,
};
