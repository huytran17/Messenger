import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";

export default function CheckBox({ checked, handler, label, ...rest }) {
  return (
    <FormControlLabel
      sx={{
        "& .MuiSvgIcon-root": { fontSize: 18 },
        "& .MuiTypography-root": { fontSize: 14 },
      }}
      control={
        <Checkbox
          checked={checked}
          onChange={() => handler()}
          inputProps={{ "aria-label": "controlled" }}
          {...rest}
        />
      }
      label={label}
    />
  );
}

CheckBox.propTypes = {
  remember_me: PropTypes.bool,
  handleCheck: PropTypes.func,
  rememberMeLabel: PropTypes.string,
};
