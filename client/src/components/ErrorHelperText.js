import FormHelperText from "@mui/material/FormHelperText";
import PropTypes from "prop-types";

export default function ErrorHelperText({ error, ...rest }) {
  return (
    error && (
      <FormHelperText error {...rest}>
        {error}
      </FormHelperText>
    )
  );
}

ErrorHelperText.propTypes = {
  error: PropTypes.string,
};

ErrorHelperText.defaultProps = {
  error: "",
};
