import {
  addHeadUser,
  allHeadUsers,
  loginAuth,
} from "../services/headUserService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// controller for add head user
export async function addHeadUserController(req, res) {
  const { name, email, password, role } = req.body;
  if (!name.trim() || !email.trim() || !password.trim() || !role.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newUser = await addHeadUser({ name, email, password, role });
    res
      .status(201)
      .json({ message: "Head user added successfully", data: { id: newUser } });
  } catch (err) {
    res.status(500).json({ error: "Error adding head user" });
  }
}

//controller for view all head users
export async function allHeadUsersController(req, res) {
  try {
    const users = await allHeadUsers();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No head users to find",
      });
    }

    res.status(200).json({
      success: true,
      message: "All head users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}

// controller for login head user
export async function loginAuthController(req, res) {
  const { email, password } = req.body;
  if (!email || !password || !email.trim() || !password.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const userAuth = await loginAuth(email);
    if (!userAuth) {
      return res.status(404).json({ error: "Invalid credentials" }); // User not found yet shows invalid credentials to avoid giving hints about which emails are registered
    }
    const isHashMatch = await bcrypt.compare(password, userAuth.hPassword);
    if (!isHashMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //generate token for track user login
    const token = jwt.sign(
      { id: userAuth.hId, role: userAuth.hRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    const { hPassword, ...userWithoutPassword } = userAuth; // Exclude password from response
    return res
      .status(200)
      .json({ message: "Login successful", data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", msg: err.message });
  }
}
