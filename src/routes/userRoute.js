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
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
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

//student login
router.post(
  "/student-login",
  authenticateToken,
  authorizeStudent,
  studentLoginController,
);

export default router;
