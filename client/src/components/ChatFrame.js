import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { selectConversation } from "../app/slices/conversationSlice";
import { useDispatch, useSelector } from "react-redux";
import { STRING } from "../constants/index";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { View } from "../constants/index";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoodIcon from "@mui/icons-material/Mood";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { pink, blue, azure } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function ChatFrame() {
  const conversation = useSelector(selectConversation);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: `calc(100vh - ${View.BOTTOM_NAV_HEIGHT}px)`,
        paddingTop: "0 !important",
      }}
    >
      <DrawerHeader />
      {conversation ? (
        <Box
          sx={{
            height: `calc(100vh - ${View.BOTTOM_NAV_HEIGHT}px - ${View.DRAWERHEADER_HEIGHT}px - 5px)`,
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            variant="contained"
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <>
                  <IconButton aria-label="settings">
                    <VideocamOutlinedIcon variant="outlined" />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "48px" }}
              >
                <IconButton aria-label="Favorites">
                  <FavoriteIcon fontSize="small" sx={{ color: pink[400] }} />
                </IconButton>
                <IconButton aria-label="Attach">
                  <AttachFileIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ width: "100%", margin: "0 16px" }}>
                <TextField
                  variant="standard"
                  placeholder="Type your message..."
                  fullWidth
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", height: "48px" }}
              >
                <IconButton aria-label="Send">
                  <SendIcon fontSize="small" sx={{ color: blue[500] }} />
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ) : (
        STRING.EMPTY
      )}
    </Box>
  );
}
