const verifyInternalRequest = (req, res, next) => {
  const secret = req.headers["x-internal-secret"];

  if (
    !secret ||
    secret !== process.env.JWT_SECRET
  ) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }

  next();
};

module.exports = verifyInternalRequest;