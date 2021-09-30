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

    dispatch(validate({ path: prop, type: Auth.TYPE.VERIFY_CODE }));
  };

  const verifyCode = () => async (event) => {
    if (isAllValid)
      await axios
        .post(`${Server.URL}:${Server.PORT}/auth/verify-code`, {
          code: data.verify_code,
        })
        .then((res) => {
          window.location.href = "/auth/reset-password";
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

  const { verifyCodeLabel, btnVerifyLabel } = props;

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
              for="verify_code"
              field="verify_code"
              label={verifyCodeLabel}
              error={error}
            />
            <Input
              id="verify_code"
              type="text"
              value={data.verify_code}
              onChange={handleChange(Field.VERIFY_CODE)}
              inputProps={{
                form: {
                  autoComplete: "off",
                  error: true,
                },
              }}
              required
            />
            <ErrorHelperText error={error.verify_code} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <ButtonBox>
              <BtnLogin variant="contained" onClick={verifyCode()}>
                {btnVerifyLabel}
              </BtnLogin>
            </ButtonBox>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

Form.propTypes = {
  verifyCodeLabel: PropTypes.string,
  btnVerifyLabel: PropTypes.string,
};

Form.defaultProps = {
  verifyCodeLabel: "Verify code",
  btnVerifyLabel: "Verify",
};
