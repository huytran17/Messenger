import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ErrorHelperText, InputLabelForError } from "../../index";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAllValid,
  changeData,
  selectData,
  selectError,
  validate,
  setError,
} from "../../../app/slices/updateInfoSlice";
import moment from "moment";
import { Auth, Field, Server } from "../../../constants/index";

const tabItems = [
  {
    label: "About",
    value: 0,
  },
  { label: "Security", value: 1 },
];

const tabIndex = {
  1: 1,
  2: 2,
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
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const isAllValid = useSelector(selectIsAllValid);

  const data = useSelector(selectData);

  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleChangeInput = (prop) => (event) => {
    dispatch(changeData({ [prop]: event.target.value }));
  };

  const dmyFormat = (time) => {
    return moment(time).format("DD/MM/yyyy");
  };

  const handleChangeDatePicker = (prop) => (newValue) => {
    dispatch(changeData({ [prop]: dmyFormat(newValue) }));
  };

  return (
    <Box sx={{ width: "100%" }}>
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
      <TabPanel value={tabValue} index={0}>
        <Box
          value={tabValue}
          index={0}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={{ xs: 1, md: 2 }} columns={12}>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                label={usernameLabel}
                value={data.username}
                onChange={handleChangeInput(Field.USERNAME)}
              />
              <ErrorHelperText error={error.username} sx={{ marginLeft: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                label={addressLabel}
                value={data.address}
                onChange={handleChangeInput(Field.ADDRESS)}
              />
              <ErrorHelperText error={error.address} sx={{ marginLeft: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                label={phoneLabel}
                value={data.phone}
                onChange={handleChangeInput(Field.PHONE)}
              />
              <ErrorHelperText error={error.phone} sx={{ marginLeft: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={dobLabel}
                  value={data.dob}
                  onChange={handleChangeDatePicker(Field.DOB)}
                  renderInput={(params) => <CommonTextField {...params} />}
                />
              </LocalizationProvider>
              <ErrorHelperText error={error.dob} sx={{ marginLeft: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="standard"
                color="success"
                sx={{ m: 1 }}
                fullWidth
              >
                <InputLabel>{genderLabel}</InputLabel>
                <Select
                  defaultValue={1}
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                label={bioLabel}
                value={data.bio}
                onChange={handleChangeInput(Field.BIO)}
              />
              <ErrorHelperText error={error.bio} sx={{ marginLeft: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="standard"
                color="success"
                sx={{ m: 1 }}
                fullWidth
              >
                <InputLabel>{relationshipLabel}</InputLabel>
                <Select
                  defaultValue={1}
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CommonTextField
                label={quoteLabel}
                value={data.quote}
                onChange={handleChangeInput(Field.QUOTE)}
              />
              <ErrorHelperText error={error.quote} sx={{ marginLeft: 1 }} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button variant="contained" disableElevation>
                {btnSaveLabel}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Box
          value={tabValue}
          index={1}
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
