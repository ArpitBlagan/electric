"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.Register = exports.logoutUser = exports.check = exports.Login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = require("../index");
const InputSchemas_1 = require("../InputSchemas");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const zz = InputSchemas_1.loginSchema.safeParse({ email, password });
    if (!zz.success) {
        return res.status(411).json({ message: "invalide credentials!" });
    }
    try {
        console.log(email);
        const user = yield index_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        console.log(user);
        if (user) {
            const ff = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (ff) {
                const token = jsonwebtoken_1.default.sign({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                }, process.env.JWT_TOKEN);
                res.cookie("jwt", token, {
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                });
                return res.status(200).json({ messaeg: "successfully loggedIn!" });
            }
            else {
                throw new Error("invalid password");
            }
        }
        else {
            throw new Error(`no user is registered with the ${email} email`);
        }
    }
    catch (err) {
        console.log(err);
        let message = "internal server error";
        if (err.message) {
            res.status(403);
            message = err === null || err === void 0 ? void 0 : err.message;
        }
        return res.json({ message });
    }
});
exports.Login = Login;
const check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(403);
    }
    res.status(200).json({
        email: req.user.email,
        name: req.user.name,
    });
});
exports.check = check;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt");
    res.status(202).json({ message: "done" });
});
exports.logoutUser = logoutUser;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const zz = InputSchemas_1.userSchema.safeParse(data);
    if (!zz.success) {
        return res
            .status(411)
            .json({ message: "invalid inputs please provide valid details" });
    }
    try {
        const hash = yield bcryptjs_1.default.hash(data.password, 10);
        const user = yield index_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
            },
        });
        console.log(user);
        res.status(202).json({ message: "user registered successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.Register = Register;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const vv = InputSchemas_1.userSchema.safeParse(data);
    if (!vv.success) {
        return res.status(411).json({ message: "please enter valid inputs" });
    }
    try {
        const user = yield index_1.prisma.user.update({
            where: { id },
            data: Object.assign({}, data),
        });
        res.status(202).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.updateUser = updateUser;
