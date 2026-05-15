const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const routerAPI = express.Router();

// Tất cả các route bên dưới sẽ đi qua middleware auth để kiểm tra token (trừ login/register được loại trừ trong auth.js)
routerAPI.use(auth);

const productsRoutes = require("./products");

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);

// Product routes (list, detail)
routerAPI.use("/products", productsRoutes);

module.exports = routerAPI;
