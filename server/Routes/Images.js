const express = require("express");
const Router = express.Router();
const { AddImage, getAllImage, DeleteImage } = require("../Controller/Image");
const multer = require("multer");

// Set up multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

Router.get("/", getAllImage);
Router.post("/Upload", upload.single("image"), AddImage);
Router.delete("/:id", DeleteImage);

module.exports = Router;
