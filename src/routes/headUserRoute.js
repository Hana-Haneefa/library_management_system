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

//head user login
router.post("/login", loginAuthController);

//add head user
router.post("/register", addHeadUserController);

//view all head users
router.get(
  "/all-headusers",
  authenticateToken,
  authorizeAdmin,
  allHeadUsersController,
);

//view head user by ID
router.get(
  "/headuser-byId/:id",
  authenticateToken,
  authorizeAdmin,
  headUserByIdController,
);

//edit head users
router.put(
  "/edit-headuser/:id",
  authenticateToken,
  authorizeAdmin,
  editHeadUserController,
);

//delete head users
router.delete(
  "/delete-headuser/:id",
  authenticateToken,
  authorizeAdmin,
  deleteHeadUserController,
);

export default router;
