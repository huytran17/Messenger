import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import axios from "axios";
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
import { Action, Server, _String } from "../../../constants/index";
import { ErrorHelperText, InputLabelForError } from "../../index";

export default function Form(props) {
  const error = useSelector(selectError);

  const data = useSelector(selectData);

  const remember_me = useSelector(selectRememberMe);

  const isAllValid = useSelector(selectIsAllValid);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop, type: Action.TYPE.LOGIN }));
  };

  const handleChecked = (event) => {
    dispatch(rememberMeCheck());
  };

  const login = () => async (event) => {
    if (isAllValid)
      await axios
        .post(
          `${Server.URL}:${Server.PORT}/auth/login`,
          {
            email: data.email,
            password: data.password,
            remember_me: remember_me,
          },
          { withCredentials: true }
        )
        .then((res) => {
          window.location.href = "/";
        })
        .catch((err) => {
          dispatch(
            setError({
              path: err.response.data.path,
              error: err.response.data.errors,
            })
          );
        });
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
          <FormControl>
            <FormControlLabel
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
                "& .MuiTypography-root": { fontSize: 14 },
              }}
              control={
                <Checkbox
                  checked={remember_me}
                  onChange={handleChecked}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={rememberMeLabel}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: "0px !important" }}>
          <FormControl>
            <FormLink href="#" underline="hover">
              {fogetPwdLinkLabel}
            </FormLink>
            <FormLink href="/auth/register" underline="hover">
              {registerLinkLabel}
            </FormLink>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <ButtonBox>
              <BtnLogin variant="contained" onClick={login()}>
                {btnLoginLabel}
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
