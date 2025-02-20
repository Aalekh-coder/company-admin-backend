import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controller/blog.Controller.js";
import  authMiddleware from "../middleware/auth.Middleware.js"; // Assumes you have an auth middleware
const router = express.Router();

// Protected routes (require user authentication)
router.use(authMiddleware);

// CRUD Routes
router.post("/", createBlog); // Create a blog
router.get("/get", getBlogs); // Get all blogs
router.get("/:id", getBlogById); // Get a single blog by ID
router.put("/:id", updateBlog); // Update a blog
router.delete("/:id", deleteBlog); // Delete a blog

export default router;
