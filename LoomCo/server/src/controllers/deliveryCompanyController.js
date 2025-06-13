import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminOrModeratorMiddleware from '../middlewares/adminOrModeratorMiddleware.js';
import deliveryService from '../services/deliveryCompanyService.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const companies = await deliveryService.getAll();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authMiddleware, adminOrModeratorMiddleware, async (req, res) => {
    try {
        const created = await deliveryService.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', authMiddleware, adminOrModeratorMiddleware, async (req, res) => {
    try {
        const updated = await deliveryService.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', authMiddleware, adminOrModeratorMiddleware, async (req, res) => {
    try {
        const result = await deliveryService.delete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
