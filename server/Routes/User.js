const express = require("express");
const { Register, Login, Delete, Update } = require("../Controller/user");
const Router = express.Router();

Router.post("/register/", Register);
Router.post("/login/", Login);
Router.delete("/delete/:id", Delete);
Router.patch("/update/:id", Update);

module.exports = Router;
