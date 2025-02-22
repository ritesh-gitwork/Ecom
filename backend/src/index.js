const express = require("express");
const dotenv = require("dotenv").config();

const dbConnect = require("./config/dbConnect");

dbConnect();

const app = express();

//middleware
app.use(express.json());

//Routes

//start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`sever is running at port ${PORT}`);
});
