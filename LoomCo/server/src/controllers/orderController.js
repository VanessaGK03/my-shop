import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import orderService from '../services/orderService.js';

const orderController = Router();

orderController.post('/', authMiddleware, async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            user: req.user.id
        };

        const newOrder = await orderService.createOrder(orderData);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

orderController.get('/my-orders', authMiddleware, async (req, res) => {
    try {
        const orders = await orderService.getUserOrders(req.user.id);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

orderController.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

orderController.get('/:id', authMiddleware, async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

export default orderController;
