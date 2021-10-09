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

const SecurityTab = ({
  pwdLabel,
  newPwdLabel,
  rePwdLabel,
  index,
  value,
  ...rest
}) => {
  return (
    <div>
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
            {/* <XFormGridItem errorField={error.username}>
              <CommonTextField
                label={pwdLabel}
                value={data.password}
                onChange={handleChangeInput(Field.USERNAME)}
              />
            </XFormGridItem> */}
          </Grid>
        </Box>
      </TabPanel>
    </div>
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
