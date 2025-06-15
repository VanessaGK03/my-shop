import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import productService from '../services/productService.js';

const productController = Router();

// GET /api/products
productController.get('/', async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/products/:id
productController.get('/:id', async (req, res) => {
    try {
        const product = await productService.getById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// POST /api/products
productController.post('/', authMiddleware, async (req, res) => {
    try {
        const created = await productService.create(req.body);
        res.status(201).json(created);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/products/:id
productController.put('/:id', authMiddleware, async (req, res) => {
    console.log(req.body);
    
    try {
        const updated = await productService.update(req.params.id, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/products/:id
productController.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const result = await productService.delete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST /api/products/:id/reviews
productController.post('/:id/reviews', authMiddleware, async (req, res) => {
    try {
        const product = await productService.addReview(req.params.id, req.user, req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/products/:id/reviews
productController.put('/:id/reviews', authMiddleware, async (req, res) => {
    try {
        const product = await productService.editReview(req.params.id, req.user._id, req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/products/:id/reviews
productController.delete('/:id/reviews', authMiddleware, async (req, res) => {
    try {
        const isPrivileged = req.user.isAdmin || req.user.isModerator;
        const product = await productService.deleteReview(req.params.id, req.user._id, isPrivileged);
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /api/products/:id/reviews
productController.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await productService.getReviews(req.params.id);
        res.json(reviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

export default productController;
