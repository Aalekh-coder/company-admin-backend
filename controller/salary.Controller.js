import Salary, { find as findSalaries } from '../model/salary.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create Salary Entry
export const createSalary = asyncHandler(async (req, res) => {
    const { employeeId, amount } = req.body;

    if (!employeeId || !amount) {
        throw new ApiError(400, 'All fields are required: employeeId, amount');
    }

    const salary = new Salary({ employeeId, amount });
    await salary.save();

    res.status(201).json(new ApiResponse(201, salary, 'Salary entry created successfully'));
});

// Get All Salaries
export const getAllSalaries = asyncHandler(async (req, res) => {
    const salaries = await findSalaries();

    if (!salaries.length) {
        throw new ApiError(404, 'No salary records found');
    }

    res.status(200).json(new ApiResponse(200, salaries, 'Salary records retrieved successfully'));
});

// Get Salary By ID
export const getSalaryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const salary = await Salary.findById(id).populate('employeeId', 'name');

    if (!salary) {
        throw new ApiError(404, 'Salary record not found');
    }

    res.status(200).json(new ApiResponse(200, salary, 'Salary record retrieved successfully'));
});

// Update Salary Entry
export const updateSalary = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    const salary = await Salary.findByIdAndUpdate(
        id,
        { amount },
        { new: true, runValidators: true }
    );

    if (!salary) {
        throw new ApiError(404, 'Salary record not found');
    }

    res.status(200).json(new ApiResponse(200, salary, 'Salary record updated successfully'));
});

// Delete Salary Entry
export const deleteSalary = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const salary = await Salary.findByIdAndDelete(id);

    if (!salary) {
        throw new ApiError(404, 'Salary record not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Salary record deleted successfully'));
});
