import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true }, // номер на поръчката
  fullName: { type: String, required: true },              // име на клиента
  phoneNumber: { type: String, required: true },           // телефон
  products: [                                              // списък с поръчаните продукти
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
      color: { type: String, required: true },
      price: { type: Number, required: true } // цената за единична бройка на този продукт
    }
  ],
  courier: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryCompany', required: true }, // коя фирма доставя
  deliveryType: { type: String, enum: ['office', 'address'], required: true }, // тип на доставката
  deliveryAddress: { type: String, required: true }, // адрес
  totalPrice: { type: Number, required: true },           // тотална сума (продукти + доставка)
  date: { type: Date, default: Date.now },                // кога е направена поръчката
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // кой потребител я е направил
});

const Order = mongoose.model('Order', orderSchema);

export default Order;