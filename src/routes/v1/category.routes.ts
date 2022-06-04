import { Router } from "express";
import { CategoryController } from "../../controller/CategoryController";

const router = Router();
const { getCategories } = new CategoryController();

router.get("/", getCategories);



export default router;