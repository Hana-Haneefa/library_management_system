import {
  addBorrowData,
  getAllBorrowData,
  getBorrowDataById,
  updateBorrowData,
  deleteBorrowData,
} from "../services/borrowService.js";

export async function addBorrowDataController(req, res) {
  const { studentId, MonitorId, returnDate, status } = req.body;
  if (!studentId || !MonitorId || !returnDate || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const borrowData = await addBorrowData({
      studentId,
      MonitorId,
      returnDate,
      status,
    });

    res
      .status(201)
      .json({ msg: "Borrow data added successfully", info: borrowData });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error adding borrow data", error: err.message });
  }
}

export async function getAllBorrowDataController(req, res) {
  try {
    const allBorrowData = await getAllBorrowData();
    res
      .status(200)
      .json({ msg: "Borrow data retrieved successfully", info: allBorrowData });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching borrow data", error: err.message });
  }
}

export async function getBorrowDataByIdController(req, res) {
  const { borrowId } = req.params;
  try {
    const borrowData = await getBorrowDataById(borrowId);
    if (!borrowData || borrowData.brId !== parseInt(borrowId)) {
      return res.status(404).json({ msg: "Borrow data not found" });
    }
    res
      .status(200)
      .json({ msg: "Borrow data retrieved successfully", info: borrowData });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching borrow data", error: err.message });
  }
}

export async function updateBorrowDataController(req, res) {
  const { borrowId } = req.params;
  const { status } = req.body;

  if (!status || !borrowId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (status !== "borrowed" && status !== "returned") {
    return res.status(400).json({ error: "Invalid status value" });
  }
  try {
    const updatedBorrowData = await updateBorrowData(borrowId, { status });
    res.status(200).json({
      msg: "Borrow data updated successfully",
      info: updatedBorrowData,
    });
  } catch (err) {
    if (err.message.includes("Borrow data not found with the given ID")) {
      return res
        .status(404)
        .json({ msg: "Borrow data not found", error: err.message });
    }
    res
      .status(500)
      .json({ msg: "Error updating borrow data", error: err.message });
  }
}

export async function deleteBorrowDataController(req, res) {
  const { borrowId } = req.params;
  if (!borrowId) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const deletedBorrowData = await deleteBorrowData(borrowId);
    res.status(200).json({
      msg: "Borrow data deleted successfully",
      info: deletedBorrowData,
    });
  } catch (err) {
    if (err.message.includes("Borrow data not found with the given ID")) {
      return res
        .status(404)
        .json({ msg: "Borrow data not found", error: err.message });
    }
    res
      .status(500)
      .json({ msg: "Error deleting borrow data", error: err.message });
  }
}
