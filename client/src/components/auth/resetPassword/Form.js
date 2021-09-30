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
} from "../../../app/slices/authFormSlice";
import { Auth, Server, Field } from "../../../constants/index";
import { ErrorHelperText, InputLabelForError } from "../../index";

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
        .catch((err) => {
          console.error(err);
          dispatch(
            setError({
              path: err.response.data.path,
              error: err.response.data.errors,
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
              onChange={handleChange(Field.EMAIL)}
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
              onChange={handleChange(Field.PASSWORD)}
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
              onChange={handleChange(Field.RE_PASSWORD)}
              required
            />
            <ErrorHelperText error={error.re_password} />
          </FormControl>
        </Grid>
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
