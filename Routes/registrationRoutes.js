const express = require("express");

const router = express.Router();

const registrationController = require("../Controllers/registrationController");

const registrationValidation = require("../Middleware/registrationValidation");
const verifyInternalRequest = require("../Middleware/internalAuth");

// ======================================================
// ADMIN REGISTRATION
// ======================================================

router.post(
  "/admin/register",
  registrationValidation,
  registrationController.registerAdmin
);

// ======================================================
// FACULTY REGISTRATION
// ======================================================

router.post(
  "/faculty/register",
  registrationValidation,
  registrationController.registerFaculty
);

// ======================================================
// UPDATE FACULTY STATUS
// ======================================================

router.put(
  "/faculty/:id/status",
  registrationController.updateFacultyStatus
);

// ======================================================
// GET ALL USERS
// ======================================================

router.get(
  "/users",
  registrationController.getAllUsers
);

// ======================================================
// INTERNAL USER LOOKUP
// ======================================================

router.get(
  "/internal/user/:email",
  verifyInternalRequest,
  registrationController.getInternalUser
);

// ======================================================
// INTERNAL PASSWORD UPDATE
// ======================================================

router.put(
  "/internal/user/password",
  verifyInternalRequest,
  registrationController.updateUserPassword
);

module.exports = router;