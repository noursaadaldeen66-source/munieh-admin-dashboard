
import mongoose, { Document, Schema } from 'mongoose';

export interface IUpgradeRequest extends Document {
  user: mongoose.Schema.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: Date;
}

const UpgradeRequestSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true, // A user can only have one open request at a time
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UpgradeRequest = mongoose.model<IUpgradeRequest>('UpgradeRequest', UpgradeRequestSchema);

export default UpgradeRequest;
