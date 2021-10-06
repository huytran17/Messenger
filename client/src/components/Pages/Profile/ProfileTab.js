import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  changeData,
  selectData,
  selectError,
  selectIsAllValid,
  validate,
} from "../../../app/slices/updateInfoSlice";
import { Field, STRING } from "../../../constants/index";
import { ErrorHelperText } from "../../index";

const tabItems = [
  {
    label: "About",
    value: 0,
  },
  { label: "Security", value: 1 },
];

const tabIndex = {
  frs: 0,
  sec: 1,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const CommonTextField = ({ ...props }) => {
  return <TextField variant="standard" color="success" {...props} />;
};

const GridItem = ({ children, errorField, ...props }) => {
  return (
    <Grid item xs={12} sm={6} {...props}>
      {children}
      {errorField ? (
        <ErrorHelperText error={errorField} sx={{ marginLeft: 1 }} />
      ) : (
        STRING.EMPTY
      )}
    </Grid>
  );
};

const CommonFormControl = ({ children, inputLabel, ...props }) => {
  return (
    <FormControl
      variant="standard"
      color="success"
      sx={{ m: 1 }}
      fullWidth
      {...props}
    >
      <InputLabel>{inputLabel}</InputLabel>
      {children}
    </FormControl>
  );
};

export default function ProfileTab({
  usernameLabel,
  phoneLabel,
  addressLabel,
  genderLabel,
  relationshipLabel,
  bioLabel,
  dobLabel,
  quoteLabel,
  btnSaveLabel,
  ...rest
}) {
  const [tabValue, setTabValue] = React.useState(tabIndex.frs);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const isAllValid = useSelector(selectIsAllValid);

  const data = useSelector(selectData);

  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const location = useLocation();

  const handleChangeInput = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
    dispatch(validate({ path: prop }));
  };

  const dmyFormat = (date) => {
    return moment(date).format("DD/MM/yyyy");
  };

  const handleChangeDatePicker = (prop) => (newValue) => {
    dispatch(changeData({ [prop]: dmyFormat(newValue) }));
  };

  const update = (event) => {};

  useEffect(() => {
    console.log(location.pathname.split("/").pop());
  }, []);

  return (
    <Box sx={{ width: "100%" }} {...rest}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="user profile tab"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabItems.map((item, index) => {
            return (
              <Tab
                label={item.label}
                {...a11yProps(item.value)}
                key={index}
                wrapped
              />
            );
          })}
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={tabIndex.frs}>
        <Box
          value={tabValue}
          index={tabIndex.frs}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={{ xs: 1, md: 2 }} columns={12}>
            <GridItem errorField={error.username}>
              <CommonTextField
                label={usernameLabel}
                value={data.username}
                onChange={handleChangeInput(Field.USERNAME)}
              />
            </GridItem>
            <GridItem errorField={error.address}>
              <CommonTextField
                label={addressLabel}
                value={data.address}
                onChange={handleChangeInput(Field.ADDRESS)}
              />
            </GridItem>
            <GridItem errorField={error.phone}>
              <CommonTextField
                label={phoneLabel}
                value={data.phone}
                onChange={handleChangeInput(Field.PHONE)}
              />
            </GridItem>
            <GridItem errorField={error.dob}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={dobLabel}
                  value={data.dob}
                  onChange={handleChangeDatePicker(Field.DOB)}
                  renderInput={(params) => <CommonTextField {...params} />}
                />
              </LocalizationProvider>
            </GridItem>
            <GridItem errorField={error.gender}>
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
            </GridItem>
            <GridItem errorField={error.bio}>
              <CommonTextField
                label={bioLabel}
                value={data.bio}
                onChange={handleChangeInput(Field.BIO)}
              />
            </GridItem>
            <GridItem errorField={error.relationship}>
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
            </GridItem>
            <GridItem errorField={error.quote}>
              <CommonTextField
                label={quoteLabel}
                value={data.quote}
                onChange={handleChangeInput(Field.QUOTE)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} sx={{ textAlign: "right" }}>
              <Button variant="contained" disableElevation onClick={update}>
                {btnSaveLabel}
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={tabIndex.sec}>
        <Box
          value={tabValue}
          index={tabIndex.sec}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        ></Box>
      </TabPanel>
    </Box>
  );
}

ProfileTab.propTypes = {
  usernameLabel: PropTypes.string.isRequired,
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

ProfileTab.defaultProps = {
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
