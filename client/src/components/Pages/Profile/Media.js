import CardMedia from "@mui/material/CardMedia";
import CoverPhoto from "../../../static/images/loginPanel.jpg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectData } from "../../../app/slices/userSlice";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { styled } from "@mui/material/styles";

const SmallCamera = styled(CameraAltIcon)(({ theme }) => ({
  display: "none",
}));

const CardMediaContainer = styled(CardMedia)(({ theme }) => ({
  "&:hover": {
    "& .MuiSvgIcon-root": {
      display: "block",
    },
  },
}));

export default function Media({ cover, height, ...props }) {
  var user = useSelector(selectData);

  return (
    <>
      <CardMediaContainer
        component="div"
        children={
          <>
            <CardMedia
              component="img"
              height={height}
              image={user.cover_photo || CoverPhoto}
              alt={user.username}
              {...props}
            />
            <SmallCamera sx={{ position: "absolute", bottom: 1, right: 1 }} />
          </>
        }
        sx={{ position: "relative" }}
        {...props}
      />
    </>
  );
}

Media.propTypes = {
  cover: PropTypes.string,
  height: PropTypes.number,
};

Media.defaultProps = {
  cover: CoverPhoto,
  height: 200,
};
