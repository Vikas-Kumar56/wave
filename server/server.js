const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const router = require("./router");
const compression = require("compression");
require("dotenv").config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.use(express.static("client/build"));

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const port = process.env.PORT || 3003;

router(app, formidable, cloudinary);

app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
