import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  patchUser,
  deleteUser
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// Public route
router.get("/", getUsers);

// Protected routes
router.post("/", authMiddleware, createUser);
router.put("/:id", authMiddleware, updateUser);
router.patch("/:id", authMiddleware, patchUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
