import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeData,
  selectData,
  selectError,
  selectIsAllValid,
  setError,
  validate,
} from "../../../app/slices/authSlice";
import { Auth, Server, Field } from "../../../constants/index";
import {
  ErrorHelperText,
  InputLabelForError,
  PasswordField,
  FormGridItem,
  CommonTextField,
} from "../../index";

export default function Form(props) {
  const error = useSelector(selectError);

  const data = useSelector(selectData);

  const isAllValid = useSelector(selectIsAllValid);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));

    dispatch(validate({ path: prop, type: Auth.TYPE.RESET_PWD }));
  };

  const resetPassword = () => async (event) => {
    if (isAllValid)
      await axios
        .patch(`${Server.URL}:${Server.PORT}/auth/reset-password`, {
          email: data.email,
          password: data.password,
          re_password: data.re_password,
        })
        .then((res) => {
          window.location.href = "/auth/login";
        })
        .catch((e) => {
          if (e.response)
            dispatch(
              setError({
                path: e.response.data.path,
                error: e.response.data.errors,
              })
            );
        });
  };

  const { repasswordLabel, passwordLabel, btnConfirmLabel, emailLabel } = props;

  const sxContainerBox = {
    width: "100%",
    "& .MuiFormControl-root": { width: "100%" },
    "& .MuiInputBase-input": { padding: "10px" },
    "& .MuiBox-root": { marginTop: "8px" },
  };

  const ButtonBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
  });

  const BtnLogin = styled(Button)({
    borderRadius: "20px",
    flexShrink: 1,
    boxShadow: "none",
  });

  return (
    <Box component="form" sx={sxContainerBox}>
      <Grid container spacing={2}>
        <FormGridItem errorField={error.email}>
          <CommonTextField
            label={emailLabel}
            value={data.email}
            onChange={handleChange(Field.EMAIL)}
            inputProps={{
              form: {
                autoComplete: "off",
                error: true,
              },
            }}
            required
          />
        </FormGridItem>
        <PasswordField
          errorField={error.password}
          label={passwordLabel}
          value={data.password}
          changeHandler={handleChange(Field.PASSWORD)}
          tf={{ required: true }}
        />
        <PasswordField
          errorField={error.re_password}
          label={repasswordLabel}
          value={data.re_password}
          changeHandler={handleChange(Field.RE_PASSWORD)}
          tf={{ required: true }}
        />
        <Grid item xs={12}>
          <FormControl>
            <ButtonBox>
              <BtnLogin variant="contained" onClick={resetPassword()}>
                {btnConfirmLabel}
              </BtnLogin>
            </ButtonBox>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

Form.propTypes = {
  emailLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  repasswordLabel: PropTypes.string,
  btnConfirmLabel: PropTypes.string,
};

Form.defaultProps = {
  emailLabel: "Email",
  passwordLabel: "New password",
  repasswordLabel: "Confirm password",
  btnConfirmLabel: "Confirm",
};
