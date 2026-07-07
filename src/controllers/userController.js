import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  studentLogin,
} from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAllUsersController(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching users",
    });
  }
}

export async function getUserByIdController(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the user",
    });
  }
}

export async function addUserController(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: name, email, password",
    });
  }
  try {
    const newSafeUser = await addUser(name, email, hashedPassword);
    if (!newSafeUser) {
      return res.status(400).json({
        success: false,
        error: "Failed to add user",
      });
    }
    const { uPassword, ...userWithoutPassword } = newSafeUser[0]; // Exclude password from response
    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while adding the user",
    });
  }
}

export async function updateUserController(req, res) {
  const { id } = req.params;
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, password",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const updatedUser = await updateUser(id, name, email, hashedPassword);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the user",
    });
  }
}

export async function deleteUserController(req, res) {
  const { id } = req.params;
  if (!id.trim()) {
    return res.status(400).json({
      success: false,
      message: "Missing required field: id",
    });
  }
  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
    });
  }
}

//student login controller
export async function studentLoginController(req, res) {
  const { email, password } = req.body;

  try {
    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, password",
      });
    }
    const loginStudent = await studentLogin(email);
    if (!loginStudent) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, loginStudent.uPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    //generate token for track user login
    const token = jwt.sign(
      { id: loginStudent.uId, role: loginStudent.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const { uPassword, ...studentWithoutPassword } = loginStudent; // Exclude password from response
    res.status(200).json({
      success: true,
      token, //token send with the successful login data
      user: {
        id: studentWithoutPassword.uId,
        name: studentWithoutPassword.uName,
        email: studentWithoutPassword.uEmail,
        role: studentWithoutPassword.role,
      },
    });
  } catch (error) {
    console.error("Error logging in student:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in the student",
    });
  }
}
