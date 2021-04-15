import express from "express";
import {
    createProduct,
    createProductReview,
    deleteProductById,
    getProductById,
    getProducts,
    getTopProducts,
    updateProduct,
} from "../controllers/productControllers.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", protect, isAdmin, createProduct);

router.get("/top", getTopProducts);

router.post("/:id/reviews", protect, createProductReview);

router.get("/:id", getProductById);

router.delete("/:id", protect, isAdmin, deleteProductById);

router.put("/:id", protect, isAdmin, updateProduct);


export default router;
