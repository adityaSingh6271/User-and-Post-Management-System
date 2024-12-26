const express = require("express");
const router = express.Router();
const postValidation = require("../utils/postValidation");
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// Routes with proper path parameters
router.get("/", getAllPosts);
router.post("/", postValidation, createPost);
router.put("/:id", postValidation, updatePost); // Make sure :id is included
router.delete("/:id", deletePost);

module.exports = router;
