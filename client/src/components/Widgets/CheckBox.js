import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";

export default function CheckBox({
  checked,
  handleCheck,
  rememberMeLabel,
  ...rest
}) {
  return (
    <FormControlLabel
      sx={{
        "& .MuiSvgIcon-root": { fontSize: 18 },
        "& .MuiTypography-root": { fontSize: 14 },
      }}
      control={
        <Checkbox
          checked={checked}
          onChange={() => handleCheck()}
          inputProps={{ "aria-label": "controlled" }}
          {...rest}
        />
      }
      label={rememberMeLabel}
    />
  );
}

CheckBox.propTypes = {
  remember_me: PropTypes.bool,
  handleCheck: PropTypes.func,
  rememberMeLabel: PropTypes.string,
};
