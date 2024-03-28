import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
import Router from "./Route";
import CookieParser from "cookie-parser";
dotenv.config();
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
const app = express();
app.use(
  cors({
    origin: ["*", "http://localhost:5173", "https://electric-blue.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(CookieParser());
app.use("/api/ele", Router);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
