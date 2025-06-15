import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  size: [{ type: String, enum: ['S', 'M', 'L', 'XL'] }],
  color: [{ type: String, enum: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Gray'] }],
  image: String,
  discount: Boolean,
  discountValue: Number,
  type: { type: String, enum: ['Dress', 'T-shirt', 'Trousers', 'Polo'] },
  category:String,
  reviews: [reviewSchema]
});

const Product = mongoose.model('Product', productSchema);

export default Product;