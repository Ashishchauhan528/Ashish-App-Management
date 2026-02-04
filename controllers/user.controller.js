import {users } from "../data/users.js";


// ✅ GET all users
export const getUsers = (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
};

// create users
export const createUser = (req,res)=>{
    try{
        const {name,email } =req.body;

        //VALIDATION
        if(!name || !email){
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

        res.status(201).json({
            success:true,
            data:newUser
        });
    }
    catch(error){
        res.status(500).json({
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

    // Find index of user
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove user
    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};