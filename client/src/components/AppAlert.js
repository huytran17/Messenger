import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectOpen,
  selectTitle,
  selectMessage,
} from "../app/slices/alertSlice";

export default function AppAlert({ severity, ...restProps }) {
  const isOpen = useSelector(selectOpen);

  const title = useSelector(selectTitle);

  const message = useSelector(selectMessage);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={isOpen}>
        <Alert severity={severity} {...restProps}>
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}

AppAlert.propTypes = {
  severity: PropTypes.string,
};

AppAlert.defaultProps = {
  severity: "",
};
