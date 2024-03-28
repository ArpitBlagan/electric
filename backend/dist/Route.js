"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./controller/user");
const Vechile_1 = require("./controller/Vechile");
const validate_1 = require("./controller/validate");
const multer = require("multer");
// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
// Create the multer instance
const upload = multer({ storage: storage });
const Router = express_1.default.Router();
Router.route("/login").post(user_1.Login);
Router.route("/register").post(user_1.Register);
Router.use(validate_1.validate);
Router.route("/vechile/add").post(upload.single("file"), Vechile_1.addVechile);
Router.route("/isloggedin").get(user_1.check);
Router.route("/user:id").patch(user_1.updateUser);
Router.route("/vechile:id").delete(Vechile_1.deleteVechile);
Router.route("/vechile").get(Vechile_1.getVechile);
exports.default = Router;
