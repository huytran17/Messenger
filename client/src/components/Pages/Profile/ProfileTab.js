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

const tabItems = [
  {
    label: "About",
    value: 0,
  },
  { label: "Security", value: 1 },
];

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valued, setValued] = React.useState(null);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
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
      <TabPanel value={value} index={0}>
        <Box
          value={value}
          index={0}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={{ xs: 1, md: 2 }} columns={12}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={usernameLabel}
                variant="standard"
                color="success"
              />
              <ErrorHelperText
                error={"error.password"}
                sx={{ marginLeft: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={addressLabel}
                variant="standard"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={phoneLabel}
                variant="standard"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={valued}
                  onChange={(newValue) => {
                    setValued(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" color="success" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="standard"
                color="success"
                sx={{ m: 1 }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-filled-label">
                  {genderLabel}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  defaultValue={1}
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
              <TextField label={bioLabel} variant="standard" color="success" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="standard"
                color="success"
                sx={{ m: 1 }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-filled-label">
                  {relationshipLabel}
                </InputLabel>
                <Select
                  defaultValue={1}
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
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
              <TextField
                label={quoteLabel}
                variant="standard"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button variant="contained" disableElevation>
                {btnSaveLabel}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
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
};

ProfileTab.defaultProps = {
  usernameLabel: "Username",
  phoneLabel: "Phone number",
  addressLabel: "Address",
  genderLabel: "Gender",
  relationshipLabel: "Relationship",
  bioLabel: "Bio",
  quoteLabel: "Quote",
  dobLabel: "Dob",
  btnSaveLabel: "Save",
};
