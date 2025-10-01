import mongoose from 'mongoose';

const shopCarSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    quantity: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const shopCarModel = mongoose.model('ShopCar', shopCarSchema);
