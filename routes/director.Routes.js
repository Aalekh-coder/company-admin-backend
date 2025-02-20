import { Router } from 'express';
import { getEmployees, getAttendance, getSalaries, getPayments, getBalanceSheet } from '../controller/director.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';
import roleMiddleware from '../middleware/role.Middleware.js';

const router = Router();

router.use(authMiddleware, roleMiddleware(['director']));

router.get('/employees', getEmployees);
router.get('/attendance', getAttendance);
router.get('/salaries', getSalaries);
router.get('/payments', getPayments);
router.get('/balancesheet', getBalanceSheet);

export default router;
