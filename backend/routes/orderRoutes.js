import express from "express";
import {
    addOrderItems,
    getAllOrders,
    getOrderById,
    getUserOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
} from "../controllers/orderControllers.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addOrderItems);

router.get("/", protect, isAdmin, getAllOrders);

router.get("/myorders", protect, getUserOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/pay", protect, updateOrderToPaid);

router.put("/:id/delivered", protect, isAdmin, updateOrderToDelivered);

export default router;
