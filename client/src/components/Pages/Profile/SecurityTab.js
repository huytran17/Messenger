import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeData,
  selectData,
  selectError,
  selectIsAllValid,
  validate,
  setError,
} from "../../../app/slices/securitySlice";
import { AuthContext } from "../../../ctx/appCtx";
import { Field, Server } from "../../../constants/index";
import { PasswordField, TabPanel, FormGridItem } from "../../index";
import Button from "@mui/material/Button";
import axios from "axios";

const errSx = { marginLeft: 1 };

const SecurityTab = ({
  pwdLabel,
  newPwdLabel,
  rePwdLabel,
  btnSaveLabel,
  index,
  value,
  ...rest
}) => {
  const data = useSelector(selectData);

  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const isAllValid = useSelector(selectIsAllValid);

  const handleChangeInput = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop }));
  };

  const useAuth = () => {
    return useContext(AuthContext);
  };

  const auth = useAuth();

  const update = async () => {
    const { password, re_password, new_password } = data;

    if (isAllValid) {
      await axios
        .patch(`${Server.URL}:${Server.PORT}/users`, {
          id: auth.id,
          ...{ password, re_password, new_password },
        })
        .then(() => {
          localStorage.removeItem("token");

          sessionStorage.removeItem("token");

          window.location.reload();
        })
        .catch((error) => {
          if (error.response)
            dispatch(
              setError({
                path: error.response.data.path,
                error: error.response.data.errors,
              })
            );
        });
    }
  };

  return (
    <TabPanel value={value} index={index} {...rest}>
      <Box
        value={value}
        index={index}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={{ xs: 1, md: 2 }} columns={12}>
          <PasswordField
            errorField={error.password}
            errSx={errSx}
            label={pwdLabel}
            value={data.password}
            changeHandler={handleChangeInput(Field.PASSWORD)}
            tf={{ required: true }}
          />
          <PasswordField
            errorField={error.new_password}
            errSx={errSx}
            label={newPwdLabel}
            value={data.new_password}
            changeHandler={handleChangeInput(Field.NEW_PASSWORD)}
            tf={{ required: true }}
          />
          <PasswordField
            errorField={error.re_password}
            errSx={errSx}
            label={rePwdLabel}
            value={data.re_password}
            changeHandler={handleChangeInput(Field.RE_PASSWORD)}
            tf={{ required: true }}
          />
          <FormGridItem xs={12} sm={12} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              disableElevation
              onClick={update}
              sx={{ float: "right" }}
            >
              {btnSaveLabel}
            </Button>
          </FormGridItem>
        </Grid>
      </Box>
    </TabPanel>
  );
};

SecurityTab.propTypes = {
  pwdLabel: PropTypes.string,
  newPwdLabel: PropTypes.string,
  rePwdLabel: PropTypes.string,
  btnSaveLabel: PropTypes.string,
  index: PropTypes.number,
  value: PropTypes.number,
};

SecurityTab.defaultProps = {
  pwdLabel: "Current password",
  newPwdLabel: "New password",
  rePwdLabel: "Re-type new password",
  btnSaveLabel: "Save",
  index: 1,
  value: 1,
};

export default SecurityTab;
