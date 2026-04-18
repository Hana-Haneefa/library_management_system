import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

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
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, password",
    });
  }
  try {
    const newUser = await addUser(name, email, password);
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the user",
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
  try {
    const updatedUser = await updateUser(id, name, email, password);
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
