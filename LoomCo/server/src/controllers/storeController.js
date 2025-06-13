import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminOrModeratorMiddleware from '../middlewares/adminOrModeratorMiddleware.js';
import storeService from '../services/storeService.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const info = await storeService.getStoreInfo();
        res.json(info);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.put('/', authMiddleware, adminOrModeratorMiddleware, async (req, res) => {
    try {
        const updated = await storeService.updateStoreInfo(req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;