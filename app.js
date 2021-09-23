const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const _CONF = require("./config/app");
const dbConnect = require("./database/connect.database");
const router = require("./routes/router");
const socket = require("./socket.io/socket");

const app = express();

dbConnect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(
  helmet.contentSecurityPolicy({
    useDefault: true,
    directives: {
      "script-src": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        _CONF.APP_URL,
        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.4/axios.min.js",
        "https://unpkg.com/axios/dist/axios.min.js",
      ],
      "style-src": [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        _CONF.APP_URL,
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
      ],
      "img-src": "self data:",
      "default-src": "*",
    },
  })
);
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: _CONF.SESSION_SECRET,
  })
);
app.use(cookieParser(_CONF.COOKIE_SECRET));

app.use(express.static("./public"));

router(app);

const server = app.listen(_CONF.SERVER_PORT, () => {
  console.log(`Server started on port ${_CONF.SERVER_PORT}`);
});

socket.listen(server);

//TODO display user's default avatar
