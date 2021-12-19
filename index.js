const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const googleAuth = require("./routes/googleAuth");
const cookie = require("./routes/cookie");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//routes
app.use(
  cors({
    credentials: true,
    origin: [process.env.CORS_API],
    exposedHeaders:["set-cookie"]
  })
);
app.use(cookieParser());

app.use("/authGoogle", googleAuth);
app.use("/cookie", cookie);

app.listen(process.env.PORT, () => {
  console.log("Connected to some port...");
});
mongoose
  .connect(process.env.db)
  .then(() => console.log("Connected to: ", process.env.db))
  .catch((err) => console.log("cannot connect db error:", err));
