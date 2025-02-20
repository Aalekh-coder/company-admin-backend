import Payment, { find as findPayments } from '../model/payment.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create Payment Entry
export const createPayment = asyncHandler(async (req, res) => {
    const { employeeId, amount, method } = req.body;

    if (!employeeId || !amount || !method) {
        throw new ApiError(400, 'All fields are required: employeeId, amount, method');
    }

    const payment = new Payment({ employeeId, amount, method });
    await payment.save();

    res.status(201).json(new ApiResponse(201, payment, 'Payment entry created successfully'));
});

// Get All Payments
export const getAllPayments = asyncHandler(async (req, res) => {
    const payments = await findPayments();

    if (!payments.length) {
        throw new ApiError(404, 'No payment records found');
    }

    res.status(200).json(new ApiResponse(200, payments, 'Payment records retrieved successfully'));
});

// Get Payment By ID
export const getPaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payment = await Payment.findById(id).populate('employeeId', 'name');

    if (!payment) {
        throw new ApiError(404, 'Payment record not found');
    }

    res.status(200).json(new ApiResponse(200, payment, 'Payment record retrieved successfully'));
});

// Update Payment Entry
export const updatePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { amount, method } = req.body;

    const payment = await Payment.findByIdAndUpdate(
        id,
        { amount, method },
        { new: true, runValidators: true }
    );

    if (!payment) {
        throw new ApiError(404, 'Payment record not found');
    }

    res.status(200).json(new ApiResponse(200, payment, 'Payment record updated successfully'));
});

// Delete Payment Entry
export const deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
        throw new ApiError(404, 'Payment record not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Payment record deleted successfully'));
});
