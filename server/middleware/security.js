const { body } = require("express-validator");

// Sanitize inputs
const sanitizeInputs = (req, res, next) => {
  // Basic sanitization (extend as needed)
  next();
};

module.exports = sanitizeInputs;
