const registrationValidation = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    subject,
  } = req.body;

  // ======================================================
  // REQUIRED COMMON FIELDS
  // ======================================================

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // ======================================================
  // EMAIL VALIDATION
  // ======================================================

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // ======================================================
  // PASSWORD VALIDATION
  // ======================================================

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  // ======================================================
  // CONFIRM PASSWORD
  // ======================================================

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

  // ======================================================
  // FACULTY SUBJECT VALIDATION
  // ======================================================

  if (
    req.path.includes("/faculty") &&
    (!subject || !subject.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Subject is required for faculty",
    });
  }

  next();
};

module.exports = registrationValidation;