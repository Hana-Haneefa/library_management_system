import { Router } from "express";
import { userInfo } from "../data/userData.js";

const router = Router();

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
