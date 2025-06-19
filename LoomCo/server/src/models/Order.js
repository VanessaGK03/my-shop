import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true }, // номер на поръчката
  fullName: { type: String, required: true },              // име на клиента
  phoneNumber: { type: String, required: true },           // телефон
  products: [                                              // списък с поръчаните продукти
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      price: { type: Number, required: true } // цената за единична бройка на този продукт
    }
  ],
  totalPrice: { type: Number, required: true },           // тотална сума (продукти + доставка)
  date: { type: Date, default: Date.now },                // кога е направена поръчката
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // кой потребител я е направил
});

const Order = mongoose.model('Order', orderSchema);

export default Order;