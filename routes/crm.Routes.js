import express from 'express';
import { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../controller/crm.Controller.js';

const router = express.Router();

// Routes for customer CRUD operations
router.get('/customers', getAllCustomers);  // Get all customers
router.get('/customers/:id', getCustomerById);  // Get a customer by ID
router.post('/customers', createCustomer);  // Create a new customer
router.put('/customers/:id', updateCustomer);  // Update an existing customer
router.delete('/customers/:id', deleteCustomer);  // Delete a customer by ID

export default router;
