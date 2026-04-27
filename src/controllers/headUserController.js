import {
  addHeadUser,
  allHeadUsers,
  headUserById,
  editHeadUser,
  deleteHeadUser,
  loginAuth,
} from "../services/headUserService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// controller for add head user
export async function addHeadUserController(req, res) {
  const { name, email, password, role } = req.body;
  if (!name?.trim() || !email?.trim() || !password?.trim() || !role?.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newUser = await addHeadUser({ name, email, password, role });
    if (!newUser) {
      return res.status(404).json({
        success: false,
        message: "Adding head user failed",
      });
    }
    const { hPassword, ...safeHeadUser } = newUser;
    res.status(201).json({
      message: "Head user added successfully",
      data: safeHeadUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error adding head user", message: err.message });
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

//controller for view head users by id
export async function headUserByIdController(req, res) {
  try {
    const { id } = req.params;
    const userById = await headUserById(id);
    if (!userById) {
      return res.status(404).json({
        success: false,
        message: "No user found on that ID",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      userById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

//controller for edit headuser
export async function editHeadUserController(req, res) {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    if (!id || !name?.trim() || !email?.trim() || !role?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Required feild missing : id, name, email, role",
      });
    }
    const user = await editHeadUser(id, name, email, role);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

//delete headuser
export async function deleteHeadUserController(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Required field missing",
      });
    }

    const target = await deleteHeadUser(id);
    if (!target) {
      return res.status(404).json({
        success: false,
        message: "No users found to delete",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      target,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

// controller for login head user
export async function loginAuthController(req, res) {
  const { email, password } = req.body;
  if (!email || !password || !email.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const userAuth = await loginAuth(email);
    console.log(userAuth);

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
      .json({ message: "Login successful", token, data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", msg: err.message });
  }
}
