import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  isModerator: { type: Boolean, default: false },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

const User = model('User', userSchema);

export default User;
