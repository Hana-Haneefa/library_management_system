import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  addUserController,
  updateUserController,
  deleteUserController,
  studentLoginController,
} from "../controllers/userController.js";

const router = Router();
//view all users
router.get("/all-users", getAllUsersController);

//view user by id
router.get("/byId/:id", getUserByIdController);

//add user
router.post("/add-user", addUserController);

//edit user
router.put("/edit-user/:id", updateUserController);

//delete user
router.delete("/delete-user/:id", deleteUserController);

//student login
router.post("/student-login", studentLoginController);

export default router;
