import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectData, setError } from "../../../app/slices/userSlice";
import { Server, STRING } from "../../../constants/index";
import CoverPhoto from "../../../static/images/loginPanel.jpg";
import { FormUploadImg } from "./index";

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
  const user = useSelector(selectData);

  const dispatch = useDispatch();

  const [isShowFormUpload, setShowFormUpload] = useState(false);

  const handleOpenFormUpload = () => {
    setShowFormUpload(true);
  };

  const handleCloseFormUpload = () => {
    setShowFormUpload(false);
  };

  const changeCover = async (fileChoosen) => {
    const bodyFormData = new FormData();

    bodyFormData.append("cover_photo", fileChoosen);

    await axios({
      method: "put",
      url: `${Server.URL}:${Server.PORT}/users/${user._id}`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => {
        if (e.response)
          dispatch(
            setError({
              path: e.response.data.path,
              error: e.response.data.errors,
            })
          );
      });
  };

  return (
    <>
      <CardMediaContainer
        component="div"
        children={
          <>
            <CardMedia
              component="img"
              height={height}
              image={
                user.cover_photo
                  ? "data:image/*;base64," + user.cover_photo
                  : STRING.EMPTY
              }
              alt={user.username}
              {...props}
            />
            <SmallCamera
              onClick={handleOpenFormUpload}
              sx={{ position: "absolute", bottom: 1, right: 1 }}
            />
          </>
        }
        sx={{ position: "relative" }}
        {...props}
      />
      <FormUploadImg
        isOpen={isShowFormUpload}
        handleClose={handleCloseFormUpload}
        changeImg={changeCover}
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
