import FormHelperText from "@mui/material/FormHelperText";
import { _String } from "../constants/index";
import PropTypes from "prop-types";

export default function ErrorHelperText(props) {
  return props.error ? (
    <FormHelperText error>{props.error}</FormHelperText>
  ) : (
    _String.EMPTY
  );
}

ErrorHelperText.propTypes = {
  error: PropTypes.string,
};

ErrorHelperText.defaultProps = {
  error: "",
};
