import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeData,
  selectData,
  selectError,
  selectIsAllValid,
  validate,
  setError,
} from "../../../app/slices/authSlice";
import { Action, _String, Server } from "../../../constants/index";
import { ErrorHelperText, InputLabelForError } from "../../index";

export default function Form(props) {
  const error = useSelector(selectError);

  const data = useSelector(selectData);

  const isAllValid = useSelector(selectIsAllValid);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop, type: Action.TYPE.REGISTER }));
  };

  const register = () => async (event) => {
    if (isAllValid) {
      await axios
        .post(`${Server.URL}:${Server.PORT}`, {
          email: data.email,
          password: data.password,
          re_password: data.re_password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          dispatch(
            setError({
              path: err.response.data.path,
              error: err.response.data.errors,
            })
          );
        });
    }
  };

  const {
    emailLabel,
    passwordLabel,
    btnRegisterLabel,
    loginLinkLabel,
    repasswordLabel,
  } = props;

  const sxContainerBox = {
    width: "250px",
    "& .MuiFormControl-root": { width: "100%" },
    "& .MuiButton-root": { width: 115 },
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

  const FormLink = styled(Link)({
    fontSize: 13,
    textAlign: "right",
  });

  return (
    <Box component="form" sx={sxContainerBox}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="standard">
            <InputLabelForError
              for="email"
              field="email"
              label={emailLabel}
              error={error}
            />
            <Input
              id="email"
              type="text"
              value={data.email}
              onChange={handleChange(_String.formFields.EMAIL)}
              inputProps={{
                form: {
                  autoComplete: "off",
                  error: true,
                },
              }}
              required
            />
            <ErrorHelperText error={error.email} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard">
            <InputLabelForError
              for="password"
              field="password"
              label={passwordLabel}
            />
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={handleChange(_String.formFields.PASSWORD)}
              required
            />
            <ErrorHelperText error={error.password} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard">
            <InputLabelForError
              for="re_password"
              field="re_password"
              label={repasswordLabel}
            />
            <Input
              id="re_password"
              type="password"
              value={data.re_password}
              onChange={handleChange(_String.formFields.RE_PASSWORD)}
              required
            />
            <ErrorHelperText error={error.re_password} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLink href="#" underline="hover">
              {loginLinkLabel}
            </FormLink>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <ButtonBox>
              <BtnLogin variant="contained" onClick={register()}>
                {btnRegisterLabel}
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
  btnRegisterLabel: PropTypes.string,
  fogetPwdLinkLabel: PropTypes.string,
  loginLinkLabel: PropTypes.string,
};

Form.defaultProps = {
  emailLabel: "Email",
  passwordLabel: "Password",
  repasswordLabel: "Re-type Password",
  btnRegisterLabel: "Register",
  fogetPwdLinkLabel: "Forgot password?",
  loginLinkLabel: "Already have account",
};
