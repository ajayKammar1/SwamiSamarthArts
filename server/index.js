const express = require("express");
const app = express();
const ImagesRoute = require("./Routes/Images");
const OrderRoute = require("./Routes/Order");
const UserRoute = require("./Routes/User");
const cors = require("cors");
require("dotenv").config();

require("./DB/DBConnect");
app.use(express.json());
app.use(cors());

app.use("/Images", ImagesRoute);
app.use("/Order", OrderRoute);
app.use("/user", UserRoute);

app.listen(process.env.PORT || 2000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
