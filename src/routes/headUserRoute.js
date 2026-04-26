import { Router } from "express";
import {
  addHeadUserController,
  allHeadUsersController,
  loginAuthController,
} from "../controllers/headUserController.js";

const router = Router();

router.post("/add-headuser", addHeadUserController);
router.get("/all-headusers", allHeadUsersController);
router.get("/login", loginAuthController);

export default router;
