import { prisma } from "../index";
import { Request, Response } from "express";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import { uploadFileToS3 } from "./UploadToS3";
export const deleteVechile = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const ok = await prisma.vechile.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
export const getVechilee = async (req: Request, res: Response) => {
  try {
    const vechile = await prisma.vechile.findMany({
      include: {
        user: true,
      },
    });
    console.log(vechile);
    res.status(200).json(vechile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
function convertToISO8601(dateString: any) {
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
    } else if (meridiem === "AM" && adjustedHours === 12) {
      adjustedHours = 0;
    }

    // Create a new Date object with the parsed parts
    const dateObject = new Date(
      Date.UTC(year, month - 1, day, adjustedHours, minutes, seconds)
    );

    // Check if the dateObject is a valid date
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date");
    }

    // Return the ISO 8601 formatted date string
    return dateObject.toISOString();
  } catch (error) {
    console.error("Error converting to ISO 8601:", error);
    return null;
  }
}
export const getVechile = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  console.log(from, to);
  try {
    const vechile = await prisma.vechile.findMany({
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
export const addVechile = async (req: Request, res: Response) => {
  //@ts-ignore
  const file = req.file;
  console.log(file, req.body);
  const path = file.path;
  try {
    const data = await uploadFileToS3(file, file.filename);
    const imageUrl = `https://pirooo.s3.amazonaws.com/${file.filename}`;
    console.log(data, imageUrl);
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Image deleted successfully!");
    });
    const vv = await prisma.vechile.create({
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};
