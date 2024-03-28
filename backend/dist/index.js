"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Route_1 = __importDefault(require("./Route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv.config();
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const app = express();
app.use(cors({
    origin: ["*", "http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/ele", Route_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
