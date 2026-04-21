import { addBorrowData } from "../services/borrowService.js";

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
