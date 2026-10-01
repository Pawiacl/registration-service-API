const registrationService = require("../Services/registrationService");

// ======================================================
// ADMIN REGISTRATION
// ======================================================

const registerAdmin = async (req, res) => {
  try {
    const result = await registrationService.registerAdmin(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Admin Registration Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ======================================================
// FACULTY REGISTRATION
// ======================================================

const registerFaculty = async (req, res) => {
  try {
    const result = await registrationService.registerFaculty(req.body);

    return res.status(201).json({
      success: true,
      message: "Faculty registered successfully",
      data: result,
    });
  } catch (error) {
    console.error("Faculty Registration Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ======================================================
// UPDATE FACULTY STATUS
// ======================================================

const updateFacultyStatus = async (req, res) => {
  try {
    const result = await registrationService.updateFacultyStatus(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Faculty status updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update Faculty Status Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to update faculty status",
    });
  }
};

// ======================================================
// GET ALL USERS
// ======================================================

const getAllUsers = async (req, res) => {
  try {
    const users = await registrationService.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};

// ======================================================
// INTERNAL USER LOOKUP
// ======================================================

const getInternalUser = async (req, res) => {
  try {
    const user = await registrationService.getInternalUser(
      req.params.email
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Internal User Lookup Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// ======================================================
// INTERNAL PASSWORD UPDATE
// ======================================================

const updateUserPassword = async (req, res) => {
  try {
    const result = await registrationService.updateUserPassword(
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update User Password Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  registerAdmin,
  registerFaculty,
  updateFacultyStatus,
  getAllUsers,
  getInternalUser,
  updateUserPassword,
};