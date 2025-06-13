import mongoose from 'mongoose';

const deliveryCompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  deliveryPriceToOffice: { type: Number, required: true },
  deliveryPriceToAddress: { type: Number, required: true }
});

const DeliveryCompany = mongoose.model('DeliveryCompany', deliveryCompanySchema);

export default DeliveryCompany;