// controllers/formController.js
import Form from "../../model/From/EnquryForm.js";
import {ApiError} from "../../utils/apiError.js";
import {ApiResponse} from "../../utils/apiResponse.js";
import {asyncHandler} from "../../utils/asyncHandler.js";

// Create a new form
export const createForm = asyncHandler(async (req, res, next) => {
  const { name, email, phoneNumber, location, category } = req.body;

  if (!name || !email || !phoneNumber || !location || !category) {
    throw new ApiError(400, "All fields are required");
  }

  const form = await Form.create({ name, email, phoneNumber, location, category });
  res.status(201).json(new ApiResponse(201, form, "Form created successfully"));
});

// Get all forms
export const getForms = asyncHandler(async (req, res, next) => {
  const forms = await Form.find();
  res.status(200).json(new ApiResponse(200, forms, "Forms retrieved successfully"));
});

// Get a single form by ID
export const getFormById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const form = await Form.findById(id);
  if (!form) {
    throw new ApiError(404, "Form not found");
  }

  res.status(200).json(new ApiResponse(200, form, "Form retrieved successfully"));
});

// Update a form
export const updateForm = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phoneNumber, location, category } = req.body;

  const form = await Form.findByIdAndUpdate(
    id,
    { name, email, phoneNumber, location, category },
    { new: true, runValidators: true }
  );

  if (!form) {
    throw new ApiError(404, "Form not found");
  }

  res.status(200).json(new ApiResponse(200, form, "Form updated successfully"));
});

// Delete a form
export const deleteForm = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const form = await Form.findByIdAndDelete(id);
  if (!form) {
    throw new ApiError(404, "Form not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Form deleted successfully"));
});
