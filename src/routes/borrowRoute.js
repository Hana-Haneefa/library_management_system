import { Router } from "express";
import {
  addBorrowDataController,
  getAllBorrowDataController,
  getBorrowDataByIdController,
  updateBorrowDataController,
  deleteBorrowDataController,
} from "../controllers/borrowController.js";
const router = Router();

router.post("/new-borrow", addBorrowDataController);
router.get("/all-borrows", getAllBorrowDataController);
router.get("/byId/:borrowId", getBorrowDataByIdController);
router.put("/update-borrow/:borrowId", updateBorrowDataController);
router.delete("/delete-borrow/:borrowId", deleteBorrowDataController);
export default router;
