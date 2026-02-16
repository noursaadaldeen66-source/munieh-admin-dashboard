// Corresponds to the backend User model
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  bio: string;
  profileImage: string;
  location?: {
    type: 'Point';
    coordinates: number[];
  };
  upgradeRequestStatus: 'none' | 'pending' | 'approved' | 'rejected';
  upgradeRequestDate?: string; // Using string for Date objects from backend
  upgradeRequestMessage?: string;
  adminResponseDate?: string; // Using string for Date objects from backend
  adminResponseMessage?: string;
  createdAt: string;
  updatedAt: string;
}

// Corresponds to the backend Product model
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  seller: IUser | string; // Can be populated or just an ID
  category: 'agricultural' | 'handicraft';
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

// Corresponds to the backend Service model
export interface IService {
  _id: string;
  name: string;
  description: string;
  provider: IUser | string; // Can be populated or just an ID
  category: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

// Corresponds to the backend Story model
export interface IStory {
  _id: string;
  title: string;
  content: string;
  author: IUser | string; // Can be populated or just an ID
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Corresponds to the backend Order model
export interface IOrder {
  _id: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  orderItems: {
    name: string;
    qty: number;
    price: number;
    product: string;
  }[];
  totalPrice: number;
  paymentMethod: 'COD' | 'SyriatelCash' | 'MTNCash';
  paymentConfirmation?: {
    transactionId: string;
  };
  isPaid: boolean;
  paidAt?: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum TicketStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface SupportTicket {
  _id: string;
  farmerId: string;
  farmerName: string;
  subject: string;
  details: string;
  type: 'DirectShipping' | 'GeneralSupport';
  status: TicketStatus;
  createdAt: string;
}

export interface IUpgradeRequest {
  _id: string;
  user: IUser;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Represents the different pages/views in the admin dashboard
export type ViewState = 'dashboard' | 'map' | 'tickets' | 'users' | 'products' | 'services' | 'stories' | 'mobile-app';
