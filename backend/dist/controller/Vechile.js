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
exports.addVechile = exports.getVechile = exports.getVechilee = exports.deleteVechile = void 0;
const index_1 = require("../index");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UploadToS3_1 = require("./UploadToS3");
const deleteVechile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const ok = yield index_1.prisma.vechile.delete({
            where: {
                id,
            },
        });
        res.status(200).json({ message: "Deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.deleteVechile = deleteVechile;
const getVechilee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vechile = yield index_1.prisma.vechile.findMany({
            include: {
                user: true,
            },
        });
        console.log(vechile);
        res.status(200).json(vechile);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getVechilee = getVechilee;
function convertToISO8601(dateString) {
    try {
        // Split date and time parts
        const [datePart, timePart] = dateString.split(", ");
        // Split month, day, and year
        const [month, day, year] = datePart.split("/");
        // Split hours, minutes, and seconds
        const [time, meridiem] = timePart.split(" ");
        const [hours, minutes, seconds] = time.split(":");
        // Convert hours to 24-hour format
        let adjustedHours = parseInt(hours, 10);
        if (meridiem === "PM" && adjustedHours !== 12) {
            adjustedHours += 12;
        }
        else if (meridiem === "AM" && adjustedHours === 12) {
            adjustedHours = 0;
        }
        // Create a new Date object with the parsed parts
        const dateObject = new Date(Date.UTC(year, month - 1, day, adjustedHours, minutes, seconds));
        // Check if the dateObject is a valid date
        if (isNaN(dateObject.getTime())) {
            throw new Error("Invalid date");
        }
        // Return the ISO 8601 formatted date string
        return dateObject.toISOString();
    }
    catch (error) {
        console.error("Error converting to ISO 8601:", error);
        return null;
    }
}
const getVechile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.query;
    console.log(from, to);
    try {
        const vechile = yield index_1.prisma.vechile.findMany({
            where: {
                date_of_purchase: {
                    //@ts-ignore
                    gte: convertToISO8601(from),
                    //@ts-ignore
                    lte: convertToISO8601(to),
                },
            },
            include: {
                user: true,
            },
        });
        console.log(vechile);
        res.status(200).json(vechile);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
});
exports.getVechile = getVechile;
const addVechile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const file = req.file;
    console.log(file, req.body);
    const path = file.path;
    try {
        const data = yield (0, UploadToS3_1.uploadFileToS3)(file, file.filename);
        const imageUrl = `https://pirooo.s3.amazonaws.com/${file.filename}`;
        console.log(data, imageUrl);
        fs_1.default.unlink(path, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Image deleted successfully!");
        });
        const vv = yield index_1.prisma.vechile.create({
            data: {
                model: req.body.model,
                type: req.body.type,
                image: imageUrl,
                total_miles_driven: req.body.total_miles_driven,
                date_of_purchase: new Date(),
                license_plate: req.body.license_plate,
                energy_consumption_per_hour: req.body.energy_consumptions,
                cost: req.body.cost,
                owner: req.user.id,
            },
        });
        res.status(200).json({ message: "let's check" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.addVechile = addVechile;
