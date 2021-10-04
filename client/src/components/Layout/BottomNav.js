import FavoriteIcon from "@mui/icons-material/Favorite";
import FolderIcon from "@mui/icons-material/Folder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestoreIcon from "@mui/icons-material/Restore";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function BottomNav(props) {
  const { homeLabel, profileLabel, settingLabel, logoutLabel } = props;

  const [value, setValue] = React.useState(homeLabel);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pb: 7 }}>
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
          <BottomNavigationAction
            label={homeLabel}
            value={homeLabel}
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label={profileLabel}
            value={profileLabel}
            icon={<AccountCircleIcon />}
          />
          <BottomNavigationAction
            label={settingLabel}
            value={settingLabel}
            icon={<SettingsIcon />}
          />
          <BottomNavigationAction
            label={logoutLabel}
            value={logoutLabel}
            icon={<LogoutIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

BottomNav.propTypes = {
  homeLabel: PropTypes.string,
  profileLabel: PropTypes.string,
  settingLabel: PropTypes.string,
  logoutLabel: PropTypes.string,
};

BottomNav.defaultProps = {
  homeLabel: "Trang chủ",
  profileLabel: "Cá nhân",
  settingLabel: "Cài đặt",
  logoutLabel: "Đăng xuất",
};
