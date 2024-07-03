const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/SamarthArts")
  .then(() => console.log("DB is Connected"))
  .catch((err) => console.log(err));
