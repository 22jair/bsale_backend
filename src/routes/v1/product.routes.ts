import { Router } from "express";
import { ProductController } from "../../controller/ProductController";

const router = Router();
const { getProducts, getProductById, getTopDiscountProducts } = new ProductController();

router.get("/", getProducts);

router.get("/top_discount", getTopDiscountProducts);

router.get("/:id", getProductById);

export default router;