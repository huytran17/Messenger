import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";

export default function InputLabelForError(props) {
  return props.error[props.field] ? (
    <InputLabel htmlFor={props.for} error>
      {props.label}
    </InputLabel>
  ) : (
    <InputLabel htmlFor={props.for}>{props.label}</InputLabel>
  );
}

InputLabelForError.propTypes = {
  error: PropTypes.object,
  label: PropTypes.string,
  for: PropTypes.string,
  field: PropTypes.string,
};

InputLabelForError.defaultProps = {
  error: {},
  label: "",
  for: "",
  field: "",
};
