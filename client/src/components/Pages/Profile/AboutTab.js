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
import {
  changeData,
  selectData,
  selectError,
  selectIsAllValid,
  validate
} from "../../../app/slices/userSlice";
import { Field, Server } from "../../../constants/index";
import {
  CommonFormControl,
  CommonTextField,
  FormGridItem,
  TabPanel
} from "../../index";
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

const XFormGridItem = ({ errorField, ...rest }) => {
  return (
    <FormGridItem errorField={errorField} errSx={{ marginLeft: 1 }} {...rest} />
  );
};

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

  const user = useSelector(selectData);

  const error = useSelector(selectError);

  const dispatch = useDispatch();

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

  const update = async (event) => {
    if (isAllValid) {
      const {
        username,
        address,
        phone,
        dob,
        gender,
        bio,
        relationship,
        quote,
      } = user;
      await axios
        .patch(`${Server.URL}:${Server.PORT}/users/${user._id}`, {
          username,
          address,
          phone,
          dob,
          gender,
          bio,
          relationship,
          quote,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
            <XFormGridItem errorField={error.username}>
              <CommonTextField
                label={usernameLabel}
                value={user.username}
                onChange={handleChangeInput(Field.USERNAME)}
              />
            </XFormGridItem>
            <XFormGridItem errorField={error.address}>
              <CommonTextField
                label={addressLabel}
                value={user.address}
                onChange={handleChangeInput(Field.ADDRESS)}
              />
            </XFormGridItem>
            <XFormGridItem errorField={error.phone}>
              <CommonTextField
                label={phoneLabel}
                value={user.phone}
                onChange={handleChangeInput(Field.PHONE)}
              />
            </XFormGridItem>
            <XFormGridItem errorField={error.dob}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={localeMap.en}
              >
                <DatePicker
                  mask={maskMap.en}
                  label={dobLabel}
                  value={user.dob}
                  onChange={handleChangeDatePicker(Field.DOB)}
                  renderInput={(params) => <CommonTextField {...params} />}
                />
              </LocalizationProvider>
            </XFormGridItem>
            <XFormGridItem errorField={error.gender}>
              <CommonFormControl inputLabel={genderLabel}>
                <Select
                  value={user.gender}
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
            </XFormGridItem>
            <XFormGridItem errorField={error.bio}>
              <CommonTextField
                label={bioLabel}
                value={user.bio}
                onChange={handleChangeInput(Field.BIO)}
              />
            </XFormGridItem>
            <XFormGridItem errorField={error.relationship}>
              <CommonFormControl inputLabel={relationshipLabel}>
                <Select
                  value={user.relationship}
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
            </XFormGridItem>
            <XFormGridItem errorField={error.quote}>
              <CommonTextField
                label={quoteLabel}
                value={user.quote}
                onChange={handleChangeInput(Field.QUOTE)}
              />
            </XFormGridItem>
            <XFormGridItem xs={12} sm={12} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                disableElevation
                onClick={update}
                sx={{ float: "right" }}
              >
                {btnSaveLabel}
              </Button>
            </XFormGridItem>
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
  index: PropTypes.number,
  value: PropTypes.number,
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
  index: 0,
  value: 0,
};
