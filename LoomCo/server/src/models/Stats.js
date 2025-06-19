import mongoose from 'mongoose';

const storeStatsSchema = new mongoose.Schema({
  man: { type: Number},
  woman: { type: Number}
});

const StoreStats = mongoose.model('StoreStats', storeStatsSchema);

export default StoreStats;