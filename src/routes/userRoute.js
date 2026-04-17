import { Router } from "express";
//import { userInfo } from "../data/userData.js";
import {
  getAllUsersController,
  getUserByIdController,
  addUserController,
  updateUserController,
  deleteUserController,
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
//mock user data
// router.get("/all-users", (_, res) => {
//   res.status(200).json({
//     success: true,
//     data: userInfo,
//   });
// });

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = userInfo.find((user) => user.id === parseInt(id));
//   if (user) {
//     return res.status(200).json({
//       success: true,
//       data: user,
//     });
//   }
//   return res.status(404).json({
//     success: false,
//     message: "User not found",
//   });
// });

export default router;
