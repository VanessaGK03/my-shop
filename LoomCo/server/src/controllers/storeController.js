import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import storeService from '../services/storeService.js';

const router = Router();

router.get('/', async (req, res) => {
    console.log("dadadad");
    
    try {
        const info = await storeService.getStoreInfo();
        res.json(info);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

router.put('/', authMiddleware, async (req, res) => {
    try {
        const updated = await storeService.updateStoreInfo(req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;