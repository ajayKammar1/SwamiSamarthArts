const express = require("express");
const Router = express.Router();
const multer = require("multer");
const {
  AddOrder,
  getAllOrder,
  getSingleInvice,
  deleteOrder,
  UpdateOrder,
} = require("../Controller/Order");
// Set up multer for image uploads

const storage = multer.memoryStorage();
const upload = multer({ storage });

Router.get("/", getAllOrder);
Router.get("/:id/:bill", getSingleInvice);
Router.post("/", upload.single("image"), AddOrder);
Router.delete("/:id", deleteOrder);
Router.patch("/:id", upload.single("image"), UpdateOrder);

module.exports = Router;
