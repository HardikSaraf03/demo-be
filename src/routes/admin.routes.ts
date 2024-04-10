import { Router } from "express";
import { adminRole, auth } from "../middleware/auth.middleware";
import { adminController } from "../controller";

const router = Router();

router.get("/admin/users", auth, adminRole, adminController.usersList);

export default router;
