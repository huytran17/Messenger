import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export function ConvAvatar({ src, ...rest }) {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar {...rest} src={src} />
    </StyledBadge>
  );
}

export function GrpAvatar({ src, srcSmall, ...rest }) {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={<SmallAvatar src={srcSmall} />}
    >
      <Avatar {...rest} src={src} />
    </Badge>
  );
}

ConvAvatar.propTypes = {
  src: PropTypes.string,
};

ConvAvatar.defaultProps = {
  src: "",
};

GrpAvatar.propTypes = {
  src: PropTypes.string,
  srcSmall: PropTypes.string,
};

GrpAvatar.defaultProps = {
  src: "",
  srcSmall: "",
};
