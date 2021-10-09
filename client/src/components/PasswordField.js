import { CommonTextField, FormGridItem } from "./index";
import React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordField = ({
  errorField,
  errSx,
  label,
  value,
  changeHandler,
  gi,
  tf,
}) => {
  const [isShow, setShow] = React.useState(false);

  const handleClickShowPassword = () => {
    setShow(!isShow);
  };

  return (
    <FormGridItem errorField={errorField} errSx={errSx} {...gi}>
      <CommonTextField
        label={label}
        value={value}
        onChange={(event) => changeHandler(event)}
        type={isShow ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {isShow ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...tf}
      />
    </FormGridItem>
  );
};

export default PasswordField;
