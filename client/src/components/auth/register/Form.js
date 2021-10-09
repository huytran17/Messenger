import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
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
import { Auth, Field, Server } from "../../../constants/index";
import { CommonTextField, FormGridItem, PasswordField } from "../../index";

export default function Form(props) {
  const error = useSelector(selectError);

  const data = useSelector(selectData);

  const isAllValid = useSelector(selectIsAllValid);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop, type: Auth.TYPE.REGISTER }));
  };

  const register = () => async (event) => {
    if (isAllValid) {
      await axios
        .post(`${Server.URL}:${Server.PORT}/auth/register`, {
          username: data.username,
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
    }
  };

  const {
    emailLabel,
    passwordLabel,
    btnRegisterLabel,
    loginLinkLabel,
    repasswordLabel,
    usernameLabel,
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
  });

  return (
    <Box component="form" sx={sxContainerBox}>
      <Grid container spacing={2} columns={12}>
        <FormGridItem errorField={error.username}>
          <CommonTextField
            label={usernameLabel}
            value={data.username}
            onChange={handleChange(Field.USERNAME)}
            inputProps={{
              form: {
                autoComplete: "off",
                error: true,
              },
            }}
            required
          />
        </FormGridItem>
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
        <FormGridItem>
          <FormLink href="/auth/login" underline="hover">
            {loginLinkLabel}
          </FormLink>
        </FormGridItem>
        <FormGridItem>
          <ButtonBox>
            <Button
              variant="contained"
              disableElevation
              onClick={register()}
              sx={{ borderRadius: 999 }}
            >
              {btnRegisterLabel}
            </Button>
          </ButtonBox>
        </FormGridItem>
      </Grid>
    </Box>
  );
}

Form.propTypes = {
  usernameLabel: PropTypes.string,
  emailLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  repasswordLabel: PropTypes.string,
  btnRegisterLabel: PropTypes.string,
  fogetPwdLinkLabel: PropTypes.string,
  loginLinkLabel: PropTypes.string,
};

Form.defaultProps = {
  usernameLabel: "Username",
  emailLabel: "Email",
  passwordLabel: "Password",
  repasswordLabel: "Re-type Password",
  btnRegisterLabel: "Register",
  fogetPwdLinkLabel: "Forgot password?",
  loginLinkLabel: "Already have account",
};
