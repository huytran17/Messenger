import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { AboutTab } from "./index";

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

export default function ProfileTab({ ...props }) {
  const [tabValue, setTabValue] = React.useState(tabIndex.frs);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} {...props}>
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
      <AboutTab index={tabIndex.frs} value={tabValue} />
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
