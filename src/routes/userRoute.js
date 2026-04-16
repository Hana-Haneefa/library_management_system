import { Router } from "express";
//import { userInfo } from "../data/userData.js";
import pool from "../../db/connection.js";

const router = Router();

router.get("/all-users", async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM users`);
  res.status(200).json(rows);
});

router.get("/byId/:id", async (req, res) => {
  const { id } = req.params;
  const [row] = await pool.query(`SELECT * FROM users WHERE uId = ?`, [id]);
  res.status(200).json(row);
});

//add user
router.post("/add-user", async (req, res) => {
  const { name, email, password } = req.query;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, password",
    });
  }
  const [result] = await pool.query(
    `INSERT INTO users (uName, uEmail, uPassword) VALUES (?, ?, ?)`,
    [name, email, password],
  );
  res.status(201).json({
    success: true,
    message: "User added successfully",
  });
});

//delete user
router.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  const [deleteResult] = await pool.query(`DELETE FROM users WHERE uId=?`, [
    id,
  ]);
  if (deleteResult.affectedRows === 0) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    msg: "user deleted successfully",
  });
});

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
