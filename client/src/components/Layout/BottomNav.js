import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

export default function BottomNav(props) {
  const { homeValue, profileValue, settingValue, logoutValue } = props;

  const history = useHistory();

  const location = useLocation();

  const urlValue = {
    "": homeValue,
    home: homeValue,
    profile: profileValue,
    settings: settingValue,
    logout: logoutValue,
  };

  const [value, setValue] = React.useState(
    urlValue[location.pathname.slice(1)]
  );

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const handleChange = (event, newValue) => {
    const urlPart = getKeyByValue(urlValue, newValue);

    history.push(`/${urlPart}`);

    setValue(newValue);
  };

  const BoxContainer = styled(Box)(({ theme }) => ({
    zIndex: theme.zIndex.drawer,
  }));

  return (
    <BoxContainer sx={{ pb: 7 }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "none",
        }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ width: "100%" }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction value={homeValue} icon={<HomeIcon />} />
          <BottomNavigationAction
            value={profileValue}
            icon={<AccountCircleIcon />}
          />
          <BottomNavigationAction
            value={settingValue}
            icon={<SettingsIcon />}
          />
          <BottomNavigationAction value={logoutValue} icon={<LogoutIcon />} />
        </BottomNavigation>
      </Paper>
    </BoxContainer>
  );
}

BottomNav.propTypes = {
  homeValue: PropTypes.string,
  profileValue: PropTypes.string,
  settingValue: PropTypes.string,
  logoutValue: PropTypes.string,
};

BottomNav.defaultProps = {
  homeValue: "home",
  profileValue: "profile",
  settingValue: "settings",
  logoutValue: "logout",
};
