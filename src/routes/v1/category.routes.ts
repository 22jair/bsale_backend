import { Router } from "express";
import { CategoryController } from "../../controller/CategoryController";

const router = Router();
const { getCategories, getCategoryById } = new CategoryController();

router.get("/", getCategories);

router.get("/:id", getCategoryById);

export default router;