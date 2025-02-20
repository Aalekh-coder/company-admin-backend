import { Router } from 'express';
import authMiddleware from '../middleware/auth.Middleware.js';
import permissionMiddleware from '../middleware/employee.Middleware.js';

const router = Router();

// Auth middleware (JWT verification)
router.use(authMiddleware);

// Blogs Module
router.get('/blogs', permissionMiddleware('blogs'), (req, res) => res.send('Access to Blogs Module'));
router.post('/blogs', permissionMiddleware('blogs'), (req, res) => res.send('Create a Blog'));

// Pages Module
router.get('/pages', permissionMiddleware('pages'), (req, res) => res.send('Access to Pages Module'));
router.post('/pages', permissionMiddleware('pages'), (req, res) => res.send('Create a Page'));

// Services Module
router.get('/services', permissionMiddleware('services'), (req, res) => res.send('Access to Services Module'));

// Additional modules
router.get('/header', permissionMiddleware('header'), (req, res) => res.send('Access to Header Module'));
router.get('/footer', permissionMiddleware('footer'), (req, res) => res.send('Access to Footer Module'));
router.get('/menu', permissionMiddleware('menu'), (req, res) => res.send('Access to Menu Module'));
router.get('/post', permissionMiddleware('post'), (req, res) => res.send('Access to Post Module'));
router.get('/categories', permissionMiddleware('categories'), (req, res) => res.send('Access to Categories Module'));

export default router;
