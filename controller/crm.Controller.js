import Customer from '../model/crm.js'; // Import the Customer model
import { ApiError } from '../utils/apiError.js';  // Import ApiError class
import { ApiResponse } from '../utils/apiResponse.js';  // Import ApiResponse class
import { asyncHandler } from '../utils/asyncHandler.js';  // Import asyncHandler function

// Get All Customers
export const getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find();
    if (!customers || customers.length === 0) {
        throw new ApiError(404, 'No customers found');
    }
    res.status(200).json(new ApiResponse(200, customers, 'Customers retrieved successfully'));
});

// Get a Single Customer by ID
export const getCustomerById = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        throw new ApiError(404, 'Customer not found');
    }
    res.status(200).json(new ApiResponse(200, customer, 'Customer details retrieved successfully'));
});

// Create a New Customer
export const createCustomer = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, address, status, notes } = req.body;

    const customer = new Customer({
        firstName,
        lastName,
        email,
        phone,
        address,
        status,
        notes,
    });

    await customer.save();

    res.status(201).json(new ApiResponse(201, customer, 'Customer created successfully'));
});

// Update Customer by ID
export const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        throw new ApiError(404, 'Customer not found');
    }

    const { firstName, lastName, email, phone, address, status, notes } = req.body;

    customer.firstName = firstName || customer.firstName;
    customer.lastName = lastName || customer.lastName;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    customer.status = status || customer.status;
    customer.notes = notes || customer.notes;
    customer.updatedAt = Date.now();

    await customer.save();

    res.status(200).json(new ApiResponse(200, customer, 'Customer updated successfully'));
});

// Delete a Customer by ID
export const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        throw new ApiError(404, 'Customer not found');
    }

    await customer.deleteOne();

    res.status(200).json(new ApiResponse(200, null, 'Customer deleted successfully'));
});
