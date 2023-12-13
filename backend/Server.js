const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(`${process.env.dbUrl}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started at Port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.status(200).json({ Message: "Hello there" });
});
