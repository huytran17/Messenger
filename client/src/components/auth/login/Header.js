import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Image } from "../../index";

export default function Header({ caption }) {
  return (
    <Box>
      <Image size={{ w: 85, h: 85 }} />
      <Typography variant="caption" display="block" gutterBottom>
        {caption}
      </Typography>
    </Box>
  );
}

Header.propTypes = {
  caption: PropTypes.string,
};

Header.defaultProps = {
  caption: "caption text",
};
