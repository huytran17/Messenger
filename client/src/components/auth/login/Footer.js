import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import GoogleLogin from "react-google-login";

export default function Footer(props) {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography variant="caption" display="block" gutterBottom>
        {props.caption}
      </Typography>
      <GoogleLogin
        clientId="570633418291-u0vlfdojtpoj51pa8gko7vpi0m8f869t.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Box>
  );
}

Footer.propTypes = {
  caption: PropTypes.string,
};

Footer.defaultProps = {
  caption: "or",
};
