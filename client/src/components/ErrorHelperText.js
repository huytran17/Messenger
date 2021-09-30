import FormHelperText from "@mui/material/FormHelperText";
import { STRING } from "../constants/index";
import PropTypes from "prop-types";

export default function ErrorHelperText(props) {
  return props.error ? (
    <FormHelperText error>{props.error}</FormHelperText>
  ) : (
    STRING.EMPTY
  );
}

ErrorHelperText.propTypes = {
  error: PropTypes.string,
};

ErrorHelperText.defaultProps = {
  error: "",
};
