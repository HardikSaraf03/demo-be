import { Router } from "express";
import auth from "./auth.routes";
import admin from "./admin.routes";

const router = Router();

router.use(auth);
router.use(admin);

export default router;
