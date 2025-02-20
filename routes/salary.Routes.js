import express from 'express';
import authMiddleware from '../middleware/auth.Middleware.js';
import {
    createSalary,
    getAllSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
} from '../controller/salary.Controller.js';

const router = express.Router();

// Routes
router.post('/', authMiddleware, createSalary); // Create a Salary entry
router.get('/', authMiddleware, getAllSalaries); // Get all Salary entries
router.get('/:id', authMiddleware, getSalaryById); // Get Salary entry by ID
router.put('/:id', authMiddleware, updateSalary); // Update Salary entry
router.delete('/:id', authMiddleware, deleteSalary); // Delete Salary entry

export default router;
