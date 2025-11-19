import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  seller: mongoose.Schema.Types.ObjectId; // Reference to the User model
  category: 'agricultural' | 'handicraft';
  imageUrl: string;
  stock: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['agricultural', 'handicraft'], required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 0 },
}, {
  timestamps: true
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
