import Blog from '../model/blog.js';
import { ApiError } from '../utils//apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new blog
export const createBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, 'Title and content are required');
    }

    const newBlog = await Blog.create({
        title,
        content,
        createdBy: req.user._id,
    });

    res.status(201).json(new ApiResponse(201, newBlog, 'Blog created successfully'));
});

// Get all blogs
export const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().populate('createdBy', 'name email');

    if (!blogs || blogs.length === 0) {
        throw new ApiError(404, 'No blogs found');
    }

    res.status(200).json(new ApiResponse(200, blogs, 'Blogs retrieved successfully'));
});

// Get a single blog by ID
export const getBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate('createdBy', 'name email');

    if (!blog) {
        throw new ApiError(404, 'Blog not found');
    }

    res.status(200).json(new ApiResponse(200, blog, 'Blog retrieved successfully'));
});

// Update a blog
export const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { title, content },
        { new: true, runValidators: true }
    );

    if (!updatedBlog) {
        throw new ApiError(404, 'Blog not found');
    }

    res.status(200).json(new ApiResponse(200, updatedBlog, 'Blog updated successfully'));
});

// Delete a blog
export const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
        throw new ApiError(404, 'Blog not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Blog deleted successfully'));
});
