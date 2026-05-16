import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  addUserController,
  updateUserController,
  deleteUserController,
  studentLoginController,
} from "../controllers/userController.js";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  authorizeStudent,
} from "../middleware/authMiddleware.js";

const router = Router();

//student login
router.post("/student-login", studentLoginController);

//view all users
router.get(
  "/all-users",
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  getAllUsersController,
);

//view user by id
router.get(
  "/byId/:id",
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  getUserByIdController,
);

//add user
router.post(
  "/add-user",

  addUserController,
);

//edit user
router.put(
  "/edit-user/:id",
  authenticateToken,
  authorizeAdmin,
  updateUserController,
);

//delete user
router.delete(
  "/delete-user/:id",
  authenticateToken,
  authorizeAdmin,
  deleteUserController,
);

export default router;
