import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { View, Server } from "../../constants/index";
import { deleteAllStorage } from "../../utils/auth";
import axios from "axios";

const bottomNavHeight = View.BOTTOM_NAV_HEIGHT;

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

    if (urlValue[urlPart] !== urlValue.logout) {
      history.push(`/${urlPart}`);

      setValue(newValue);
    } else {
      localStorage.removeItem("token");

      sessionStorage.removeItem("token");

      window.location.reload();
    }
  };

  const BoxContainer = styled(Box)(({ theme }) => ({
    zIndex: theme.zIndex.drawer,
  }));

  const logout = async () => {
    await axios
      .post(`${Server.URL}:${Server.PORT}/auth/logout`)
      .then(() => {
        deleteAllStorage();
      })
      .catch((err) => {
        window.location.reload();
      });
  };

  return (
    <BoxContainer sx={{ pb: 7 }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "none",
          height: `${bottomNavHeight}px`,
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
          <BottomNavigationAction
            value={logoutValue}
            icon={<LogoutIcon />}
            onClick={logout}
          />
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
