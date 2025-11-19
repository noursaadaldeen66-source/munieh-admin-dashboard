
import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  // We don't have buyer accounts yet, so we'll store customer info directly
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  orderItems: [
    {
      name: string;
      qty: number;
      price: number;
      product: mongoose.Schema.Types.ObjectId;
    }
  ];
  totalPrice: number;
  paymentMethod: 'COD' | 'SyriatelCash' | 'MTNCash';
  paymentConfirmation?: {
    transactionId: string;
  };
  isPaid: boolean;
  paidAt?: Date;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  deliveredAt?: Date;
  notes?: string;
}

const OrderSchema: Schema = new Schema(
  {
//...
    paymentMethod: {
      type: String,
      required: true,
      default: 'COD',
    },
    paymentConfirmation: {
      transactionId: { type: String },
    },
    isPaid: {
      type: Boolean,
//...
    orderStatus: {
        type: String,
        required: true,
        default: 'Pending',
    },
    deliveredAt: {
      type: Date,
    },
    notes: { type: String },
  },
  {
//...


const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
