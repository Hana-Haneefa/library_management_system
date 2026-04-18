import { Router } from "express";
import {
  getAllBooksController,
  getBookByIdController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookController.js";

const router = Router();

router.get("/all-books", getAllBooksController);
router.get("/byId/:id", getBookByIdController);
router.post("/create-book", createBookController);
router.put("/update-book/:id", updateBookController);
router.delete("/delete-book/:id", deleteBookController);

export default router;
