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
export const getVechile = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  let ff = new Date("2000-01-01");
  let tt = new Date(Date.now());
  if (from) {
    ff = new Date(from as string);
  }
  if (to) {
    tt = new Date(to as string);
  }
  console.log(ff, tt);
  const limit = 10;
  const { take, page } = req.query;
  const takee = parseInt(take as string) | 10;
  try {
    const vechile = await prisma.vechile.findMany({
      take: takee,
      skip: 0,
      where: {
        date_of_purchase: {
          gte: new Date(ff),
          lte: new Date(tt),
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
        date_of_purchase: new Date(req.body.date),
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
