import { Router } from "express";
import {
  addBorrowDataController,
  getAllBorrowDataController,
  getBorrowDataByIdController,
  updateBorrowDataController,
  deleteBorrowDataController,
} from "../controllers/borrowController.js";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
} from "../middleware/authMiddleware.js";
const router = Router();

router.post(
  "/new-borrow",
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  addBorrowDataController,
);
router.get(
  "/all-borrows",
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  getAllBorrowDataController,
);
router.get(
  "/byId/:borrowId",
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  getBorrowDataByIdController,
);
router.put(
  "/update-borrow/:borrowId",
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  updateBorrowDataController,
);
router.delete(
  "/delete-borrow/:borrowId",
  authenticateToken,
  authorizeAdmin,
  deleteBorrowDataController,
);
export default router;
