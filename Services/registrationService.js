const bcrypt = require("bcrypt");
const User = require("../Models/user");

// ======================================================
// SEND WELCOME EMAIL
// ======================================================

const sendWelcomeEmail = async ({
  email,
  firstName,
  userType,
}) => {
  try {
    const response = await fetch(
      `${process.env.EMAIL_SERVICE_URL}/api/email/welcome`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          userType,
        }),
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Email Service returned status ${response.status}`
      );
    }
  } catch (error) {
    console.error(
      "Welcome Email Notification Error:",
      error.message
    );
  }
};

// ======================================================
// ADMIN REGISTRATION
// ======================================================

const registerAdmin = async (adminData) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = adminData;

  if (!firstName || !lastName || !email || !password) {
    const error = new Error(
      "First name, last name, email and password are required"
    );

    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Check duplicate email
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    const error = new Error(
      "Email is already registered"
    );

    error.status = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // Create admin
  const user = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    password: hashedPassword,
    userType: "admin",
  });

  // Send welcome email
  await sendWelcomeEmail({
    email: user.email,
    firstName: user.firstName,
    userType: user.userType,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: user.userType,
  };
};

// ======================================================
// FACULTY REGISTRATION
// ======================================================

const registerFaculty = async (facultyData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    subject,
    registrationNumber,
    academicYear,
  } = facultyData;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password
  ) {
    const error = new Error(
      "First name, last name, email and password are required"
    );

    error.status = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Check duplicate email
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    const error = new Error(
      "Email is already registered"
    );

    error.status = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // Create faculty
  const user = await User.create({
    firstName,
    lastName,
    email: normalizedEmail,
    password: hashedPassword,
    userType: "faculty",
    subject,
    registrationNumber,
    academicYear,
    status: true,
    remarks: "",
  });

  // Send welcome email
  await sendWelcomeEmail({
    email: user.email,
    firstName: user.firstName,
    userType: user.userType,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userType: user.userType,
    subject: user.subject,
    registrationNumber: user.registrationNumber,
    academicYear: user.academicYear,
    status: user.status,
    remarks: user.remarks,
  };
};

// ======================================================
// UPDATE FACULTY STATUS
// ======================================================

const updateFacultyStatus = async (
  id,
  statusData
) => {
  const {
    status,
    remarks,
  } = statusData;

  // Status validation
  if (typeof status !== "boolean") {
    const error = new Error(
      "Status must be true or false"
    );

    error.status = 400;
    throw error;
  }

  // Remarks mandatory when inactive
  if (
    status === false &&
    (!remarks || !remarks.trim())
  ) {
    const error = new Error(
      "Remarks are required when faculty is inactive"
    );

    error.status = 400;
    throw error;
  }

  const updatedRemarks =
    status === true
      ? ""
      : remarks.trim();

  const faculty = await User.findOne({
    _id: id,
    userType: "faculty",
  });

  if (!faculty) {
    const error = new Error(
      "Faculty not found"
    );

    error.status = 404;
    throw error;
  }

  faculty.status = status;
  faculty.remarks = updatedRemarks;

  await faculty.save();

  return {
    id: faculty._id,
    firstName: faculty.firstName,
    lastName: faculty.lastName,
    email: faculty.email,
    subject: faculty.subject,
    registrationNumber: faculty.registrationNumber,
    academicYear: faculty.academicYear,
    status: faculty.status,
    remarks: faculty.remarks,
  };
};

// ======================================================
// GET ALL USERS
// ======================================================

const getAllUsers = async () => {
  return await User.find(
    {},
    {
      password: 0,
    }
  );
};

// ======================================================
// INTERNAL USER LOOKUP
// ======================================================

const getInternalUser = async (email) => {
  const normalizedEmail = email
    .toLowerCase()
    .trim();

  return await User.findOne({
    email: normalizedEmail,
  }).select("+password");
};

// ======================================================
// INTERNAL PASSWORD UPDATE
// ======================================================

const updateUserPassword = async (
  passwordData
) => {
  const {
    email,
    password,
  } = passwordData;

  if (!email || !password) {
    const error = new Error(
      "Email and password are required"
    );

    error.status = 400;
    throw error;
  }

  const normalizedEmail = email
    .toLowerCase()
    .trim();

  // Find user first
  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    const error = new Error(
      "Email is not registered"
    );

    error.status = 404;
    throw error;
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  // Update password
  user.password = hashedPassword;

  await user.save();

  return {
    email: user.email,
  };
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  registerAdmin,
  registerFaculty,
  updateFacultyStatus,
  getAllUsers,
  getInternalUser,
  updateUserPassword,
};