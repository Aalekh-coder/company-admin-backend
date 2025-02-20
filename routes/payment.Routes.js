import express from 'express';
import authMiddleware from '../middleware/auth.Middleware.js';
import {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
} from '../controller/payment.Controller.js';

const router = express.Router();

// Routes
router.post('/', authMiddleware, createPayment); // Create a Payment entry
router.get('/', authMiddleware, getAllPayments); // Get all Payment entries
router.get('/:id', authMiddleware, getPaymentById); // Get Payment entry by ID
router.put('/:id', authMiddleware, updatePayment); // Update Payment entry
router.delete('/:id', authMiddleware, deletePayment); // Delete Payment entry

export default router;
