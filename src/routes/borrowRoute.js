import { Router } from "express";
import { addBorrowDataController } from "../controllers/borrowController.js";
const router = Router();

router.post("/new-borrow", addBorrowDataController);

export default router;
