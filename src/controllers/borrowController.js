import {
  addBorrowData,
  getAllBorrowData,
  getBorrowDataById,
  updateBorrowData,
  deleteBorrowData,
  getActiveBorrowByBookId,
} from "../services/borrowService.js";

export async function addBorrowDataController(req, res) {
  const { studentId, monitorId, status, bookId } = req.body;
  if (!studentId || !status) {
    //make monitor Id optional for now, can be added later
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }
  try {
    const borrowData = await addBorrowData({
      studentId,
      monitorId,
      status,
      bookId,
    });

    res.status(201).json({
      success: true,
      msg: "Borrow data added successfully",
      data: borrowData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error adding borrow data",
      error: err.message,
    });
  }
}

export async function getAllBorrowDataController(req, res) {
  try {
    const allBorrowData = await getAllBorrowData();
    res.status(200).json({
      success: true,
      msg: "Borrow data retrieved successfully",
      data: allBorrowData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error fetching borrow data",
      error: err.message,
    });
  }
}

export async function getBorrowDataByIdController(req, res) {
  const { borrowId } = req.params;
  try {
    const borrowData = await getBorrowDataById(borrowId);
    if (!borrowData || borrowData.brId !== parseInt(borrowId)) {
      return res.status(404).json({ msg: "Borrow data not found" });
    }
    res.status(200).json({
      success: true,
      msg: "Borrow data retrieved successfully",
      data: borrowData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error fetching borrow data",
      error: err.message,
    });
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
      success: true,
      msg: "Borrow data updated successfully",
      data: updatedBorrowData,
    });
  } catch (err) {
    if (err.message.includes("Borrow data not found with the given ID")) {
      return res.status(404).json({
        success: false,
        msg: "Borrow data not found",
        error: err.message,
      });
    }
    res.status(500).json({
      success: false,
      msg: "Error updating borrow data",
      error: err.message,
    });
  }
}

export async function deleteBorrowDataController(req, res) {
  const { borrowId } = req.params;
  if (!borrowId) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }
  try {
    const deletedBorrowData = await deleteBorrowData(borrowId);
    res.status(200).json({
      success: true,
      msg: "Borrow data deleted successfully",
      info: deletedBorrowData,
    });
  } catch (err) {
    if (err.message.includes("Borrow data not found with the given ID")) {
      return res.status(404).json({
        success: false,
        msg: "Borrow data not found",
        error: err.message,
      });
    }
    res.status(500).json({
      success: false,
      msg: "Error deleting borrow data",
      error: err.message,
    });
  }
}

export async function getActiveBorrowController(req, res) {
  try {
    const { bookId } = req.params;
    const borrow = await getActiveBorrowByBookId(bookId);

    if (!borrow) {
      return res
        .status(404)
        .json({ success: false, msg: "No active borrow found for this book" });
    }

    res.status(200).json({
      success: true,
      msg: "Active borrow data retrieved successfully",
      data: borrow,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error fetching active borrow data",
      error: err.message,
    });
  }
}

export async function returnBookController(req, res) {
  const { borrowId } = req.params;

  if (!borrowId) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    const updatedBorrowData = await updateBorrowData(borrowId, {
      status: "returned",
    });
    res.status(200).json({
      success: true,
      msg: "Book returned successfully",
      data: updatedBorrowData,
    });
  } catch (err) {
    if (err.message.includes("Borrow data not found with the given ID")) {
      return res.status(404).json({
        success: false,
        msg: "Borrow data not found",
        error: err.message,
      });
    }
    res.status(500).json({
      success: false,
      msg: "Error returning book",
      error: err.message,
    });
  }
}
