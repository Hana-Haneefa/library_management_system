import { Router } from "express";
import {
  addHeadUserController,
  loginAuthController,
} from "../controllers/headUserController.js";

const router = Router();

router.post("/signup", addHeadUserController);
router.get("/login", loginAuthController);

export default router;
