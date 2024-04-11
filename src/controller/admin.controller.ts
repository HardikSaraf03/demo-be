import { Request, Response } from "express";
import { userModel } from "../models";

const usersList = async (req: Request, res: Response) => {
  try {
    const users = await userModel.aggregate([
      { $match: { role: "user" } },
      { $project: { password: 0 } },
    ]);

    if (!users)
      return res.status(401).json({
        success: false,
        message: "No users found",
        data: null,
      });

    return res.status(200).json({
      success: true,
      message: "Admin authenticated",
      data: users,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export default { usersList };
