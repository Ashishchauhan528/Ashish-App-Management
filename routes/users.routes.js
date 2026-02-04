import express from "express";
import {
    createUser, 
    getUsers,
    updateUser,
    patchUser,
    deleteUser
} from "../controllers/user.controller.js"

const router = express.Router();

// Example route
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.patch("/:id", patchUser);
router.delete("/:id", deleteUser);


export default router;