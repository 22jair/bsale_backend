import { Router } from "express";
import { ProductController } from "../../controller/ProductController";

const router = Router();
const { getProducts } = new ProductController();

router.get("/", getProducts);

export default router;