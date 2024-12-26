const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getAllUsers,
  createUser,
  deleteUser,
} = require("../controllers/userController");

// Validation middleware
const userValidation = [
  body("name").notEmpty().trim().isLength({ max: 256 }),
  body("mobile_number").isNumeric().isLength({ min: 10, max: 15 }),
  body("address").optional().trim(),
];

router.get("/", getAllUsers);
router.post("/", userValidation, createUser);
router.delete("/:id", deleteUser);

module.exports = router;
