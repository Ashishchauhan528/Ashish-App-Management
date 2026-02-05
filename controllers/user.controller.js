import {users } from "../data/users.js";
import { deleteUserService } from "../services/user.service.js";

// ✅ GET all users
export const getUsers = (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
};

// create users
import { userDTO } from "../dtos/user.dto.js";   // add this import

// create users
export const createUser = (req, res) => {
  try {

    // Use DTO instead of req.body directly
    const { name, email } = userDTO(req.body);

    // VALIDATION
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required"
      });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email
    };

    users.push(newUser);

    return res.status(201).json({
      success: true,
      data: newUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ UPDATE user (PUT)
export const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Find user
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // PUT requires full update
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required for full update",
      });
    }

    // Update user
    user.name = name;
    user.email = email;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ PATCH user (Partial Update)
export const patchUser = (req, res) => {
  try {
    const { id } = req.params;

    // Find user
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update only provided fields
    const { name, email } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    res.status(200).json({
      success: true,
      message: "User patched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✅ DELETE user
export const deleteUser = (req, res) => {
  try {
    const { id } = req.params;

    const isDeleted = deleteUserService(id);

    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
