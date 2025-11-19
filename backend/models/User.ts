import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Password will be selected false
  role: 'buyer' | 'seller' | 'admin';
  bio: string;
  profileImage: string;
  location: {
    type: string;
    coordinates: number[];
  };
  upgradeRequestStatus: 'none' | 'pending' | 'approved' | 'rejected';
  upgradeRequestDate?: Date;
  upgradeRequestMessage?: string;
  adminResponseDate?: Date;
  adminResponseMessage?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
    required: true,
  },
  bio: { type: String },
  profileImage: { type: String },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  upgradeRequestStatus: {
    type: String,
    enum: ['none', 'pending', 'approved', 'rejected'],
    default: 'none',
    required: true,
  },
  upgradeRequestDate: { type: Date },
  upgradeRequestMessage: { type: String },
  adminResponseDate: { type: Date },
  adminResponseMessage: { type: String },
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
