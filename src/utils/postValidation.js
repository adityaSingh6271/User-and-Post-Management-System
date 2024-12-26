const { body } = require("express-validator");

const postValidation = [
  body("title").notEmpty().trim().escape(),
  body("description").optional().trim().escape(),
  body("user_id").isInt(),
  body("images").isArray(),
];

module.exports = postValidation;
