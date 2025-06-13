import Order from '../models/Order.js';

const orderService = {
    async createOrder(orderData) {
        const order = new Order(orderData);
        return await order.save();
    },

    async getUserOrders(userId) {
        return await Order.find({ user: userId })
            .populate('products.productId', 'name image')
            .populate('courier', 'name deliveryPriceToOffice deliveryPriceToAddress')
            .sort({ date: -1 });
    },

    async getAllOrders() {
        return await Order.find()
            .populate('user', 'username email')
            .populate('products.productId', 'name image')
            .populate('courier', 'name')
            .sort({ date: -1 });
    },

    async getOrderById(id) {
        const order = await Order.findById(id)
            .populate('user', 'username')
            .populate('products.productId', 'name')
            .populate('courier', 'name');

        if (!order) throw new Error('Order not found');
        return order;
    }
};

export default orderService;
