import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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

export default function ProfileTab({
  usernameLabel,
  phoneLabel,
  addressLabel,
  genderLabel,
  relationshipLabel,
  bioLabel,
  dobLabel,
  quoteLabel,
  ...rest
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              <Tab label={item.label} {...a11yProps(item.value)} wrapped />
            );
          })}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={usernameLabel}
                variant="standard"
                color="success"
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
              <TextField label={dobLabel} variant="standard" color="success" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={genderLabel}
                variant="standard"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label={bioLabel} variant="standard" color="success" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={relationshipLabel}
                variant="standard"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={quoteLabel}
                variant="standard"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" disableElevation>
                Contained
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
};
