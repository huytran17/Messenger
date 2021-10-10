import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Crypto from "crypto-js";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeData,
  rememberMeCheck,
  selectData,
  selectError,
  selectIsAllValid,
  selectRememberMe,
  setError,
  validate,
} from "../../../app/slices/authSlice";
import { CONF } from "../../../config/app";
import { Auth, Field, Server } from "../../../constants/index";
import { CommonTextField, FormGridItem, PasswordField } from "../../index";
import { CheckBox } from "../../Widgets/index";

export default function Form(props) {
  const error = useSelector(selectError);

  const data = useSelector(selectData);

  const remember_me = useSelector(selectRememberMe);

  const isAllValid = useSelector(selectIsAllValid);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop, type: Auth.TYPE.LOGIN }));
  };

  const handleChecked = (event) => {
    dispatch(rememberMeCheck());
  };

  const login = () => async (event) => {
    if (isAllValid) {
      const { email, password } = data;

      await axios
        .post(`${Server.URL}:${Server.PORT}/auth/login`, {
          ...{ email, password },
          remember_me: remember_me,
        })
        .then(async (res) => {
          const d = new Date();

          const expires = d.setDate(d.getDate() + CONF.TOKEN_EXPIRES);

          const token = Crypto.AES.encrypt(
            JSON.stringify({ id: res.data.data._id, eat: expires }),
            CONF.TOKEN_SECRET
          );

          if (remember_me) localStorage.setItem("token", token);
          else sessionStorage.setItem("token", token);

          window.location.href = "/";
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
    }
  };

  const {
    emailLabel,
    passwordLabel,
    rememberMeLabel,
    btnLoginLabel,
    fogetPwdLinkLabel,
    registerLinkLabel,
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

  const FormLink = styled(Link)({
    fontSize: 13,
    textAlign: "right",
    display: "block",
    textDecoration: "hover",
  });

  return (
    <Box component="form" sx={sxContainerBox}>
      <Grid container spacing={2} columns={12}>
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
            type="email"
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
        <FormGridItem>
          <CheckBox
            checked={remember_me}
            handler={handleChecked}
            label={rememberMeLabel}
          />
        </FormGridItem>
        <FormGridItem sx={{ paddingTop: "0px !important" }}>
          <FormLink href="/auth/forget-password">{fogetPwdLinkLabel}</FormLink>
          <FormLink href="/auth/register">{registerLinkLabel}</FormLink>
        </FormGridItem>
        <FormGridItem sx={{ paddingTop: "0px !important" }}>
          <ButtonBox>
            <Button
              variant="contained"
              disableElevation
              onClick={login()}
              sx={{ borderRadius: 999, maxWidth: "85px" }}
            >
              {btnLoginLabel}
            </Button>
          </ButtonBox>
        </FormGridItem>
      </Grid>
    </Box>
  );
}

Form.propTypes = {
  emailLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  rememberMeLabel: PropTypes.string,
  btnLoginLabel: PropTypes.string,
  fogetPwdLinkLabel: PropTypes.string,
  registerLinkLabel: PropTypes.string,
};

Form.defaultProps = {
  emailLabel: "Email",
  passwordLabel: "Password",
  rememberMeLabel: "Remember me",
  btnLoginLabel: "Login",
  fogetPwdLinkLabel: "Forgot password?",
  registerLinkLabel: "Register",
};
