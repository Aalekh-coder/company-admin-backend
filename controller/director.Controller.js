import { find } from '../model/user.Model.js';
// import { find as _find } from '../model/attandance.js';
// Ensure this import matches the model you're using
import Attendance from '../model/attandance.js';

import Salaries from '../model/salary.js';
import Payment from '../model/payment.js';
import BalanceSheet from '../model/balancesheet.js';
import { ApiError } from '../utils/apiError.js';  // Import ApiError class
import { ApiResponse } from '../utils/apiResponse.js';  // Import ApiResponse class
import { asyncHandler } from '../utils/asyncHandler.js';  // Import asyncHandler function

// Get Employees
export const getEmployees = asyncHandler(async (req, res) => {
    const employees = await find({ role: 'employee' }); // Filter by role 'employee'

    console.log(employees);

    if (!employees || employees.length === 0) {
        throw new ApiError(404, 'No employees found');
    }

    res.status(200).json(new ApiResponse(200, employees, 'Employees retrieved successfully'));
});

// Get Attendance
export const getAttendance = asyncHandler(async (req, res) => {
    const attendance = await Attendance.find().populate('employeeId', 'name'); // Use Attendance.find()
    if (!attendance || attendance.length === 0) {
        throw new ApiError(404, 'No attendance records found');
    }
    res.status(200).json(new ApiResponse(200, attendance, 'Attendance records retrieved successfully'));
});
// Get Salaries
export const getSalaries = asyncHandler(async (req, res) => {
    const salaries = await Salaries.find().populate('employeeId', 'name');
    if (!salaries || salaries.length === 0) {
        throw new ApiError(404, 'No salary records found');
    }
    res.status(200).json(new ApiResponse(200, salaries, 'Salaries retrieved successfully'));
});

// Get Payments
export const getPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find().populate('employeeId', 'name');
    if (!payments || payments.length === 0) {
        throw new ApiError(404, 'No payment records found');
    }
    res.status(200).json(new ApiResponse(200, payments, 'Payments retrieved successfully'));
});

// Get Balance Sheet
export const getBalanceSheet = asyncHandler(async (req, res) => {
    const balanceSheets = await BalanceSheet.find();
    if (!balanceSheets || balanceSheets.length === 0) {
        throw new ApiError(404, 'No balance sheet records found');
    }
    res.status(200).json(new ApiResponse(200, balanceSheets, 'Balance sheet records retrieved successfully'));
});
