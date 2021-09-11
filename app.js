const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

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

app.use(express.static("./public/uploads"));
app.use(express.static("./public/css"));

router(app);

app.listen(_CONF.SERVER_PORT, () => {
  console.log(`Server started on port ${_CONF.SERVER_PORT}`);
});
