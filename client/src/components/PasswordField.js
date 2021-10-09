import { CommonTextField, FormGridItem } from "./index";
import React from "react";

const PasswordField = ({
  errorField,
  errSx,
  label,
  value,
  changeHandler,
  field,
  ...rest
}) => {
  return (
    <FormGridItem errorField={errorField} errSx={errSx} {...rest}>
      <CommonTextField
        label={label}
        value={value}
        onChange={(event) => changeHandler(event)}
        type="password"
      />
    </FormGridItem>
  );
};

export default PasswordField;
