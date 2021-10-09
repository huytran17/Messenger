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
import { setAlert, setOpen } from "../../../app/slices/alertSlice";
import {
  changeData,
  selectData,
  selectError,
  selectIsAllValid,
  setError,
  validate,
} from "../../../app/slices/authSlice";
import { Auth, Message, Server, STRING, Field } from "../../../constants/index";
import { ErrorHelperText, InputLabelForError } from "../../index";

export default function Form(props) {
  const error = useSelector(selectError);

  const data = useSelector(selectData);

  const isAllValid = useSelector(selectIsAllValid);

  const dispatch = useDispatch();

  const handleChange = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));

    dispatch(validate({ path: prop, type: Auth.TYPE.FORGET_PWD }));
  };

  const sendVerifyEmail = () => async (event) => {
    if (isAllValid)
      await axios
        .post(`${Server.URL}:${Server.PORT}/auth/forget-password`, {
          email: data.email,
        })
        .then((res) => {
          dispatch(
            setAlert({
              title: STRING.EMPTY,
              message: Message.ALERT.MESSAGE.MAIL_SENT,
            })
          );

          dispatch(setOpen(true));
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

  const { emailLabel, btnFindLabel } = props;

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
          <FormControl>
            <ButtonBox>
              <BtnLogin variant="contained" onClick={sendVerifyEmail()}>
                {btnFindLabel}
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
  btnFindLabel: PropTypes.string,
};

Form.defaultProps = {
  emailLabel: "Email address",
  btnFindLabel: "Find",
};
