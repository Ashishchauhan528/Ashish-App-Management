export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // Example dummy check
    if (token !== "Bearer mysecrettoken") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Invalid token",
      });
    }

    // If valid → go to next controller
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
