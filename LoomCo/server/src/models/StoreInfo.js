import mongoose from 'mongoose';

const storeInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }
});

const StoreInfo = mongoose.model('StoreInfo', storeInfoSchema);

export default StoreInfo;
