import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../helpers/auth.helpers";
import { userModel } from "../models";

interface AuthRequest extends Request {
  userData?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken)
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        data: null,
      });

    const bearerToken = authToken.split(" ");
    const token = bearerToken[1];
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        data: null,
      });

    const tokenData: any = await decodeToken(token);
    if (!tokenData.data) {
      res.status(500).json({
        success: false,
        message: "Invalid token",
        data: null,
      });
    }

    const user = userModel.findOne({ _id: tokenData.data.userId });

    if (!user) {
      res.status(500).json({
        success: false,
        message: "Invalid token",
        data: null,
      });
    }

    req.userData = tokenData.data;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export const adminRole = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userData } = req;
    if (userData.role !== "admin")
      return res.status(401).json({
        success: false,
        message: "Invalid user",
        data: null,
      });
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};
