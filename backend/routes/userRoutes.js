import express from "express";
import {
    authUser,
    deleteUserController,
    getAllUsers,
    getUserById,
    getUserProfile,
    registerUser,
    updateUser,
    updateUserProfile,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);

router.post("/", registerUser);

router.put("/", protect, updateUserProfile);

router.get("/profile", protect, getUserProfile);

router.get("/", protect, isAdmin, getAllUsers);

router.delete("/:id", protect, isAdmin, deleteUserController);
router.get("/:id", protect, isAdmin, getUserById);
router.put("/:id", protect, isAdmin, updateUser);

export default router;
