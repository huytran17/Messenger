import CardMedia from "@mui/material/CardMedia";
import CoverPhoto from "../../../static/images/loginPanel.jpg";

export default function Media({ ...props }) {
  return (
    <CardMedia
      component="img"
      height="200"
      image={CoverPhoto}
      alt="Paella dish"
      {...props}
    />
  );
}
