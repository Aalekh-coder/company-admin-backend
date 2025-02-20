import BalanceSheet, { find as findBalanceSheet } from '../model/balancesheet.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create BalanceSheet Entry
export const createBalanceSheet = asyncHandler(async (req, res) => {
    const { employeeId, details } = req.body;

    if (!employeeId || !details) {
        throw new ApiError(400, 'All fields are required: employeeId, details');
    }

    const balanceSheet = new BalanceSheet({ employeeId, details });
    await balanceSheet.save();

    res.status(201).json(new ApiResponse(201, balanceSheet, 'BalanceSheet entry created successfully'));
});

// Get All BalanceSheet Entries
export const getAllBalanceSheets = asyncHandler(async (req, res) => {
    const balanceSheets = await findBalanceSheet();

    if (!balanceSheets.length) {
        throw new ApiError(404, 'No balance sheet records found');
    }

    res.status(200).json(new ApiResponse(200, balanceSheets, 'Balance sheet records retrieved successfully'));
});

// Get BalanceSheet By ID
export const getBalanceSheetById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const balanceSheet = await BalanceSheet.findById(id).populate('employeeId', 'name');

    if (!balanceSheet) {
        throw new ApiError(404, 'Balance sheet record not found');
    }

    res.status(200).json(new ApiResponse(200, balanceSheet, 'Balance sheet record retrieved successfully'));
});

// Update BalanceSheet Entry
export const updateBalanceSheet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { details } = req.body;

    const balanceSheet = await BalanceSheet.findByIdAndUpdate(
        id,
        { details },
        { new: true, runValidators: true }
    );

    if (!balanceSheet) {
        throw new ApiError(404, 'Balance sheet record not found');
    }

    res.status(200).json(new ApiResponse(200, balanceSheet, 'Balance sheet record updated successfully'));
});

// Delete BalanceSheet Entry
export const deleteBalanceSheet = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const balanceSheet = await BalanceSheet.findByIdAndDelete(id);

    if (!balanceSheet) {
        throw new ApiError(404, 'Balance sheet record not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Balance sheet record deleted successfully'));
});
