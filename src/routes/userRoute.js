import { Router } from "express";
import { userInfo } from "../data/userData.js";
import db from "../../db/connection.js";

const router = Router();

router.get("/all-users", (req, res) => {});

//add users
// router.post("/add-user", async (req, res) => {
//   const body = req.body || {};
//   const { uName, uEmail, uPassword, name, email, password } = body;
//   const userName = uName || name;
//   const userEmail = uEmail || email;
//   const userPassword = uPassword || password;

//   if (!userName || !userEmail || !userPassword) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields: uName, uEmail, uPassword",
//     });
//   }

//   try {
//     const [result] = await db.query(
//       `INSERT INTO users (uName, uEmail, uPassword) VALUES (?, ?, ?)`,
//       [userName, userEmail, userPassword],
//     );
//     res.status(201).json({
//       success: true,
//       message: "User added successfully",
//       data: {
//         id: result.insertId,
//         name: userName,
//         email: userEmail,
//       },
//     });
//   } catch (error) {
//     console.error("Error adding user:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while adding the user",
//     });
//   }
// });

//mock user data
router.get("/all-users", (_, res) => {
  res.status(200).json({
    success: true,
    data: userInfo,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = userInfo.find((user) => user.id === parseInt(id));
  if (user) {
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
  return res.status(404).json({
    success: false,
    message: "User not found",
  });
});

export default router;
