import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../models";
import { hashPassword, signInToken } from "../helpers/auth.helpers";

const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });

    const hashedPassword = await hashPassword(password);

    await userModel.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user)
    return res.status(401).json({
      success: false,
      message: "Wrong username",
    });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(401).json({
      success: false,
      message: "Wrong password",
    });

  const tokenData = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = await signInToken(tokenData);
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Token not created",
      data: null,
    });

  const userData = {
    name: user.name,
    email: user.email,
    role: user.role,
    userId: user._id,
  };

  return res.status(200).json({
    success: true,
    message: "Login successfully",
    data: { ...userData, token },
  });
};

export default { register, signIn };
