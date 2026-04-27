import { Router } from "express";
import {
  addHeadUserController,
  allHeadUsersController,
  headUserByIdController,
  editHeadUserController,
  deleteHeadUserController,
  loginAuthController,
} from "../controllers/headUserController.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginAuthController);
router.post(
  "/add-headuser",
  authenticateToken,
  authorizeAdmin,

  addHeadUserController,
);
router.get(
  "/all-headusers",
  authenticateToken,
  authorizeAdmin,
  allHeadUsersController,
);
router.get(
  "/headuser-byId/:id",
  authenticateToken,
  authorizeAdmin,
  headUserByIdController,
);
router.put(
  "/edit-headuser/:id",
  authenticateToken,
  authorizeAdmin,
  editHeadUserController,
);
router.delete(
  "/delete-headuser/:id",
  authenticateToken,
  authorizeAdmin,
  deleteHeadUserController,
);

export default router;
