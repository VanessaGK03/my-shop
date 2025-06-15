import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import deliveryService from '../services/deliveryCompanyService.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const companies = await deliveryService.getAllCompanies();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {   
    console.log(req.body);
     
    try {
        const created = await deliveryService.createCompany(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        const updated = await deliveryService.updateCompany(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const result = await deliveryService.deleteCompany(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
