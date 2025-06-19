import Product from '../models/Product.js';

const productService = {
    async getAll() {
        return await Product.find();
    },

    async getById(id) {
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');
        return product;
    },

    async create(data) {
        console.log(data);

        const product = new Product(data);
        return await product.save();
    },

    async update(id, data) {
        const product = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!product) throw new Error('Product not found');
        return product;
    },

    async delete(id) {
        const product = await Product.findByIdAndDelete(id);
        if (!product) throw new Error('Product not found');
        return { message: 'Product deleted successfully' };
    },

    async addReview(productId, user, comment) {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');

        console.log(user);
        console.log(product);

        product.reviews.push({
            userId: user._id,
            username: user.username,
            comment,
        });

        await product.save();
        return product;
    },

    async editReview(productId, userId, { rating, comment }) {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');

        const review = product.reviews.find(r => r.userId.toString() === userId.toString());
        if (!review) throw new Error('Review not found');

        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

        await product.save();
        return product;
    },

    async deleteReview(productId, userId, isPrivileged = false) {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');

        const reviewIndex = product.reviews.findIndex(r =>
            isPrivileged || r.userId.toString() === userId.toString()
        );

        if (reviewIndex === -1) throw new Error('Review not found or no permission');

        product.reviews.splice(reviewIndex, 1);
        await product.save();
        return product;
    },

    async getReviews(productId) {
        const product = await Product.findById(productId).select('reviews');
        if (!product) throw new Error('Product not found');
        return product.reviews;
    }
};

export default productService;
