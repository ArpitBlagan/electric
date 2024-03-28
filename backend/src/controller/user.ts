import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../index";
import { loginSchema, userSchema } from "../InputSchemas";
import jwt from "jsonwebtoken";
export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const zz = loginSchema.safeParse({ email, password });
  if (!zz.success) {
    return res.status(411).json({ message: "invalide credentials!" });
  }
  try {
    console.log(email);
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log(user);
    if (user) {
      const ff = await bcrypt.compare(password, user?.password);
      if (ff) {
        const token = jwt.sign(
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          },
          process.env.JWT_TOKEN as string
        );
        res.cookie("jwt", token, {
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });
        return res.status(200).json({ messaeg: "successfully loggedIn!" });
      } else {
        throw new Error("invalid password");
      }
    } else {
      throw new Error(`no user is registered with the ${email} email`);
    }
  } catch (err: any) {
    console.log(err);
    let message = "internal server error";
    if (err.message) {
      res.status(403);
      message = err?.message;
    }
    return res.json({ message });
  }
};
export const check = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(403);
  }
  res.status(200).json({
    email: req.user.email,
    name: req.user.name,
  });
};
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.cookie("jwt", "", {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
  res.status(202).json({ message: "done" });
};
export const Register = async (req: Request, res: Response) => {
  const data = req.body;
  const zz = userSchema.safeParse(data);
  if (!zz.success) {
    return res
      .status(411)
      .json({ message: "invalid inputs please provide valid details" });
  }

  try {
    const hash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    });
    console.log(user);
    res.status(202).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const vv = userSchema.safeParse(data);
  if (!vv.success) {
    return res.status(411).json({ message: "please enter valid inputs" });
  }
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { ...data },
    });
    res.status(202).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
