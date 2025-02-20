import express from 'express';
import authMiddleware from '../middleware/auth.Middleware.js';
import {
    createBalanceSheet,
    getAllBalanceSheets,
    getBalanceSheetById,
    updateBalanceSheet,
    deleteBalanceSheet,
} from '../controller/balancesheet.Controller.js';

const router = express.Router();

// Routes
router.post('/', authMiddleware, createBalanceSheet); // Create a BalanceSheet entry
router.get('/', authMiddleware, getAllBalanceSheets); // Get all BalanceSheet entries
router.get('/:id', authMiddleware, getBalanceSheetById); // Get BalanceSheet entry by ID
router.put('/:id', authMiddleware, updateBalanceSheet); // Update BalanceSheet entry
router.delete('/:id', authMiddleware, deleteBalanceSheet); // Delete BalanceSheet entry

export default router;
