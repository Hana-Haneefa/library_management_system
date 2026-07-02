import { Router } from "express";
import {
  addBorrowDataController,
  getAllBorrowDataController,
  getBorrowDataByIdController,
  updateBorrowDataController,
  deleteBorrowDataController,
  getActiveBorrowController,
  returnBookController,
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
  // authenticateToken,
  // authorizeAdmin,
  // authorizeLibrarian,
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
  "/update-borrow/:borrowId", //update to return change
  // authenticateToken,
  // authorizeAdmin,
  // authorizeLibrarian,
  updateBorrowDataController,
);
router.delete(
  "/delete-borrow/:borrowId",
  // authenticateToken,
  // authorizeAdmin,
  deleteBorrowDataController,
);

router.get("/active-by-book/:bookId", getActiveBorrowController);
router.put("/return-book/:borrowId", returnBookController);

export default router;
