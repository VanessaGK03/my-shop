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
        if (data.discount === true && (data.discountValue === undefined || data.discountValue < 1 || data.discountValue > 99)) {
            throw new Error('Discount value must be between 1 and 99 if discount is true');
        }

        if (data.discount === false && data.discountValue !== undefined) {
            throw new Error('Discount value must not be set if discount is false');
        }

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

    async addReview(productId, user, { rating, comment }) {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Product not found');

        const existingReview = product.reviews.find(r => r.userId.toString() === user._id.toString());
        if (existingReview) {
            throw new Error('You have already reviewed this product');
        }

        product.reviews.push({
            userId: user._id,
            username: user.username,
            rating,
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
