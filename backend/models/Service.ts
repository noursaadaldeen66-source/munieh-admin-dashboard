import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  provider: mongoose.Schema.Types.ObjectId; // Reference to the User model
  category: string;
  price: number;
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
}, {
  timestamps: true
});

const Service = mongoose.model<IService>('Service', ServiceSchema);

export default Service;
