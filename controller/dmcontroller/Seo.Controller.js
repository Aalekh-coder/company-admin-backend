import Item from '../../model/Digitalmarketing/Seo.js'; // Adjust the path to your model
import { ApiError,  } from '../../utils/apiError.js'; // Adjust the path to your utilities
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';

// Create a new item
export const createItem = asyncHandler(async (req, res) => {
  const { title, image, description } = req.body;

  if (!title || !image || !description) {
    throw new ApiError(400, 'All fields are required');
  }

  const newItem = await Item.create({ title, image, description });

  res.status(201).json(new ApiResponse(201, newItem, 'Item created successfully'));
});

// Get all items
export const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json(new ApiResponse(200, items, 'Items retrieved successfully'));
});

// Get a single item by ID
export const getItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Item.findById(id);

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  res.status(200).json(new ApiResponse(200, item, 'Item retrieved successfully'));
});

// Update an item by ID
export const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, image, description } = req.body;

  const item = await Item.findByIdAndUpdate(
    id,
    { title, image, description },
    { new: true, runValidators: true }
  );

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  res.status(200).json(new ApiResponse(200, item, 'Item updated successfully'));
});

// Delete an item by ID
export const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Item.findByIdAndDelete(id);

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  res.status(200).json(new ApiResponse(200, null, 'Item deleted successfully'));
});
