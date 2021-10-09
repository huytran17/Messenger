import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  changeData,
  selectData,
  selectError,
  selectIsAllValid,
  validate,
  setData,
} from "../../../app/slices/securitySlice";
import { Field, Server } from "../../../constants/index";
import {
  CommonFormControl,
  PasswordField,
  CommonTextField,
  FormGridItem,
  TabPanel,
} from "../../index";
import { localeMap, maskMap } from "../../utils/index";

const XFormGridItem = ({ errorField, ...rest }) => {
  return (
    <FormGridItem errorField={errorField} errSx={{ marginLeft: 1 }} {...rest} />
  );
};

const errSx = { marginLeft: 1 };

const SecurityTab = ({
  pwdLabel,
  newPwdLabel,
  rePwdLabel,
  index,
  value,
  ...rest
}) => {
  const data = useSelector(selectData);

  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleChangeInput = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop }));
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
          />
          <PasswordField
            errorField={error.new_password}
            errSx={errSx}
            label={newPwdLabel}
            value={data.new_password}
            changeHandler={handleChangeInput(Field.NEW_PASSWORD)}
          />
          <PasswordField
            errorField={error.re_password}
            errSx={errSx}
            label={rePwdLabel}
            value={data.re_password}
            changeHandler={handleChangeInput(Field.RE_PASSWORD)}
          />
        </Grid>
      </Box>
    </TabPanel>
  );
};

SecurityTab.propTypes = {
  pwdLabel: PropTypes.string,
  newPwdLabel: PropTypes.string,
  rePwdLabel: PropTypes.string,
  index: PropTypes.number,
  value: PropTypes.number,
};

SecurityTab.defaultProps = {
  pwdLabel: "Current password",
  newPwdLabel: "New password",
  rePwdLabel: "Re-type new password",
  index: 1,
  value: 1,
};

export default SecurityTab;
