import * as React from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import { _String } from "../../../constants/index";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  changeData,
  validate,
  selectError,
  selectData,
} from "../../../app/slices/loginSlice";

export default function Login(props) {
  const error = useSelector(selectError);

  const data = useSelector(selectData);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate(prop));
  };

  const {
    emailLabel,
    passwordLabel,
    rememberMeLabel,
    btnLoginLabel,
    fogetPwdLabel,
  } = props;

  const ContainerBox = styled(Box)({
    width: "250px",
    "& .MuiFormControl-root": { width: "100%" },
    "& .MuiButton-root": { width: 115 },
    "& .MuiInputBase-input": { padding: "10px" },
    "& .MuiBox-root": { marginTop: "8px" },
  });

  const ButtonBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
  });

  const FormLabel = styled(FormControlLabel)({
    "& .MuiSvgIcon-root": { fontSize: 18 },
    "& .MuiTypography-root": { fontSize: 14 },
  });

  const BtnLogin = styled(Button)({
    borderRadius: "20px",
    flexShrink: 1,
  });

  const ForgotPwdLink = styled(Link)({
    fontSize: 13,
    textAlign: "right",
  });

  return (
    <ContainerBox component="form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="standard">
            <InputLabel htmlFor="email">{emailLabel}</InputLabel>
            <Input
              id="email"
              name="email"
              type="text"
              value={data.email}
              onChange={handleChange(_String.EMAIL)}
              inputProps={{
                form: {
                  autoComplete: "off",
                },
              }}
            />
            {error.email ? (
              <FormHelperText error>{error.email}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard">
            <InputLabel htmlFor="password">{passwordLabel}</InputLabel>
            <Input
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange(_String.PASSWORD)}
            />
            {error.password ? (
              <FormHelperText error>{error.password}</FormHelperText>
            ) : (
              ""
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel
              control={<Checkbox defaultChecked />}
              label={rememberMeLabel}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: "0px !important" }}>
          <FormControl>
            <ForgotPwdLink href="#" underline="hover">
              {fogetPwdLabel}
            </ForgotPwdLink>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <ButtonBox>
              <BtnLogin variant="contained">{btnLoginLabel}</BtnLogin>
            </ButtonBox>
          </FormControl>
        </Grid>
      </Grid>
    </ContainerBox>
  );
}

Login.propTypes = {
  emailLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  rememberMeLabel: PropTypes.string,
  btnLoginLabel: PropTypes.string,
  fogetPwdLabel: PropTypes.string,
};

Login.defaultProps = {
  emailLabel: "Email",
  passwordLabel: "Password",
  rememberMeLabel: "Remember me",
  btnLoginLabel: "Login",
  fogetPwdLabel: "Forgot password?",
};
