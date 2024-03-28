import express from "express";
import {
  Login,
  Register,
  check,
  logoutUser,
  updateUser,
} from "./controller/user";
import {
  addVechile,
  deleteVechile,
  getVechile,
  getVechilee,
} from "./controller/Vechile";
import { validate } from "./controller/validate";
const multer = require("multer");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "src/");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create the multer instance
const upload = multer({ storage: storage });
const Router = express.Router();

Router.route("/login").post(Login);
Router.route("/register").post(Register);
Router.route("/vechile").get(getVechile);
Router.route("/vechileall").get(getVechilee);
Router.route("/user").get(logoutUser);
Router.use(validate);
Router.route("/vechile/add").post(upload.single("file"), addVechile);
Router.route("/isloggedin").get(check);
Router.route("/user:id").patch(updateUser);
Router.route("/vechile:id").delete(deleteVechile);

export default Router;
