import bcrypt from "bcryptjs";
import * as Jwt from "jsonwebtoken";
import { userModel } from "../models";

export const hashPassword = (password: string) => {
  const saltRound = "10";
  const hashedPassword = bcrypt.hashSync(password, parseInt(saltRound, 10));
  return hashedPassword;
};

export const signInToken = (userData: object) => {
  const jwtKey = process.env.JWT_KEY || "";
  try {
    const tokenData = Jwt.sign(userData, jwtKey, {
      expiresIn: "1d",
    });

    if (!tokenData)
      return {
        success: false,
        message: "Token not created",
      };

    return tokenData;
  } catch (error) {
    return {
      success: false,
      message: "Token not created",
    };
  }
};

export const decodeToken = async (token: string) => {
  try {
    const jwtKey = process.env.JWT_KEY || "";
    const jwtPayload = await Jwt.verify(token, jwtKey);

    if (!jwtPayload)
      return {
        success: false,
        message: "Token Invalid",
        data: null,
      };

    return {
      success: true,
      message: "Token decoded",
      data: jwtPayload,
    };
  } catch (error) {
    return {
      success: false,
      message: "Token Invalid",
      data: null,
    };
  }
};
