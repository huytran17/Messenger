import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  changeData,
  getUserAsync,
  selectData,
  selectError,
  validate,
  selectIsAllValid,
} from "../../../app/slices/updateInfoSlice";
import { Field } from "../../../constants/index";
import { CommonFormControl, FormGridItem, CommonTextField } from "../../index";
import { TabPanel } from "../../index";
import { localeMap, maskMap } from "../../utils/index";

const genders = [
  { label: "Male", value: 1 },
  { label: "Female", value: 2 },
  { label: "Other", value: 3 },
];

const relationships = [
  { label: "Single", value: 1 },
  { label: "In A Relationship", value: 2 },
  { label: "Dating", value: 3 },
  { label: "Married", value: 4 },
];

export default function AboutTab({
  usernameLabel,
  phoneLabel,
  addressLabel,
  genderLabel,
  relationshipLabel,
  bioLabel,
  dobLabel,
  quoteLabel,
  btnSaveLabel,
  index,
  value,
  ...rest
}) {
  const isAllValid = useSelector(selectIsAllValid);

  const data = useSelector(selectData);

  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const location = useLocation();

  const handleChangeInput = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop }));
  };

  const mdyFormat = (date) => {
    return moment(date).format("MM/DD/yyyy");
  };

  const handleChangeDatePicker = (prop) => (newValue) => {
    dispatch(changeData({ [prop]: mdyFormat(newValue) }));
  };

  const update = (event) => {};

  useEffect(() => {
    const uid = location.pathname.split("/").pop();

    dispatch(getUserAsync(uid));
  }, [location.pathname, dispatch]);

  return (
    <>
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
            <FormGridItem errorField={error.username}>
              <CommonTextField
                label={usernameLabel}
                value={data.username}
                onChange={handleChangeInput(Field.USERNAME)}
              />
            </FormGridItem>
            <FormGridItem errorField={error.address}>
              <CommonTextField
                label={addressLabel}
                value={data.address}
                onChange={handleChangeInput(Field.ADDRESS)}
              />
            </FormGridItem>
            <FormGridItem errorField={error.phone}>
              <CommonTextField
                label={phoneLabel}
                value={data.phone}
                onChange={handleChangeInput(Field.PHONE)}
              />
            </FormGridItem>
            <FormGridItem errorField={error.dob}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={localeMap.en}
              >
                <DatePicker
                  mask={maskMap.en}
                  label={dobLabel}
                  value={data.dob}
                  onChange={handleChangeDatePicker(Field.DOB)}
                  renderInput={(params) => <CommonTextField {...params} />}
                />
              </LocalizationProvider>
            </FormGridItem>
            <FormGridItem errorField={error.gender}>
              <CommonFormControl inputLabel={genderLabel}>
                <Select
                  value={data.gender}
                  onChange={handleChangeInput(Field.GENDER)}
                >
                  {genders.map((item, index) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </CommonFormControl>
            </FormGridItem>
            <FormGridItem errorField={error.bio}>
              <CommonTextField
                label={bioLabel}
                value={data.bio}
                onChange={handleChangeInput(Field.BIO)}
              />
            </FormGridItem>
            <FormGridItem errorField={error.relationship}>
              <CommonFormControl inputLabel={relationshipLabel}>
                <Select
                  value={data.relationship}
                  onChange={handleChangeInput(Field.RELATIONSHIP)}
                >
                  {relationships.map((item, index) => {
                    return (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </CommonFormControl>
            </FormGridItem>
            <FormGridItem errorField={error.quote}>
              <CommonTextField
                label={quoteLabel}
                value={data.quote}
                onChange={handleChangeInput(Field.QUOTE)}
              />
            </FormGridItem>
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
    </>
  );
}

AboutTab.propTypes = {
  usernameLabel: PropTypes.string,
  phoneLabel: PropTypes.string,
  addressLabel: PropTypes.string,
  genderLabel: PropTypes.string,
  relationshipLabel: PropTypes.string,
  bioLabel: PropTypes.string,
  quoteLabel: PropTypes.string,
  dobLabel: PropTypes.string,
  btnSaveLabel: PropTypes.string,
  username: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  gender: PropTypes.string,
  dob: PropTypes.string,
  relationship: PropTypes.string,
  bio: PropTypes.string,
  quote: PropTypes.string,
};

AboutTab.defaultProps = {
  usernameLabel: "Username",
  phoneLabel: "Phone number",
  addressLabel: "Address",
  genderLabel: "Gender",
  relationshipLabel: "Relationship",
  bioLabel: "Bio",
  quoteLabel: "Quote",
  dobLabel: "Birthday",
  btnSaveLabel: "Save",
};
