const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const _CONF = require("./config/app");
const dbConnect = require("./database/connect.database");
const router = require("./routes/index.router");

const app = express();

dbConnect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(helmet());
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

app.use(express.static("./public/uploads"));
app.use(express.static("./public/css"));

router(app);

app.listen(_CONF.SERVER_PORT, () => {
  console.log(`Server started on port ${_CONF.SERVER_PORT}`);
});
