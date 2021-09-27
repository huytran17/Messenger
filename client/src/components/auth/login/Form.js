import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeData, selectData, selectError, selectIsAllValid, validate
} from "../../../app/slices/loginSlice";
import { _String } from "../../../constants/index";

export default function Login(props) {
  const error = useSelector(selectError);
  
  const data = useSelector(selectData);

  const isAllValid = useSelector(selectIsAllValid);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate(prop));
  };

  const login = () => (event) => {
    if (isAllValid) {
      console.log("valid");
    }
  };

  const ErrorHelperText = (props) => {
    return props.error ? (
      <FormHelperText error>{props.error}</FormHelperText>
    ) : (
      _String.EMPTY
    );
  };

  const InputLabelForError = (props) => {
    return error[props.field] ? (
      <InputLabel htmlFor={props.for} error>
        {props.label}
      </InputLabel>
    ) : (
      <InputLabel htmlFor={props.for}>{props.label}</InputLabel>
    );
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

  const FormLabel = styled(FormControlLabel)({
    "& .MuiSvgIcon-root": { fontSize: 18 },
    "& .MuiTypography-root": { fontSize: 14 },
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
            <InputLabelForError for="email" field="email" label={emailLabel} />
            <Input
              id="email"
              name="email"
              type="text"
              value={data.email}
              onChange={handleChange(_String.EMAIL)}
              inputProps={{
                form: {
                  autoComplete: "off",
                  error: true,
                },
              }}
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
              name="password"
              value={data.password}
              onChange={handleChange(_String.PASSWORD)}
            />
            <ErrorHelperText error={error.password} />
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
            <FormLink href="#" underline="hover">
              {fogetPwdLinkLabel}
            </FormLink>
            <FormLink href="#" underline="hover">
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

Login.propTypes = {
  emailLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  rememberMeLabel: PropTypes.string,
  btnLoginLabel: PropTypes.string,
  fogetPwdLinkLabel: PropTypes.string,
  registerLinkLabel: PropTypes.string,
};

Login.defaultProps = {
  emailLabel: "Email",
  passwordLabel: "Password",
  rememberMeLabel: "Remember me",
  btnLoginLabel: "Login",
  fogetPwdLinkLabel: "Forgot password?",
  registerLinkLabel: "Register",
};
