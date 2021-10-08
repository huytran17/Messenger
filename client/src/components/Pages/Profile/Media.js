import CardMedia from "@mui/material/CardMedia";
import CoverPhoto from "../../../static/images/loginPanel.jpg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectData } from "../../../app/slices/authSlice";

export default function Media({ cover, ...props }) {
  var user = useSelector(selectData);

  return (
    <CardMedia
      component="img"
      height="200"
      image={user.cover_photo || CoverPhoto}
      alt="Paella dish"
      {...props}
    />
  );
}

Media.propTypes = {
  cover: PropTypes.string,
};

Media.defaultProps = {
  cover: CoverPhoto,
};
