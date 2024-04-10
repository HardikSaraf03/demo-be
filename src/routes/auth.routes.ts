import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import { authValidation } from "../validations";
import { authController } from "../controller";

const router = Router();

router.post(
  "/signup",
  celebrate(authValidation.registerSchema),
  authController.register
);

router.post(
  "/signIn",
  celebrate(authValidation.signInSchema),
  authController.signIn
);

export default router;
