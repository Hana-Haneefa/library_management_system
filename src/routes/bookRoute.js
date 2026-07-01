import { Router } from "express";
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookController.js";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.get(
  "/all-books",
  // authenticateToken,
  // authorizeAdmin,
  // authorizeLibrarian,
  getAllBooksController,
);
router.get(
  "/byId/:id",
  authenticateToken,
  authorizeAdmin,
  authorizeLibrarian,
  getBookByIdController,
);
router.post(
  "/create-book",
  // authenticateToken,
  // authorizeAdmin,
  upload.single("coverImg"),
  createBookController,
);
router.put(
  "/update-book/:id",
  authenticateToken,
  authorizeAdmin,
  updateBookController,
);
router.delete(
  "/delete-book/:id",
  // authenticateToken,
  // authorizeAdmin,
  deleteBookController,
);

export default router;
