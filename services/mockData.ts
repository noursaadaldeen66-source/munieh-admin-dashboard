import { Driver, Hub, SupportTicket, TicketStatus, UserRole, Product, Story } from '../types';

export const MOCK_DRIVERS: Driver[] = [
  { _id: 'd1', name: 'Ahmed Al-Hassan', phone: '0912345678', role: UserRole.DRIVER, location: { lat: 34.8021, lng: 38.9968 }, status: 'active' },
  { _id: 'd2', name: 'Sami Youssef', phone: '0923456789', role: UserRole.DRIVER, location: { lat: 35.1021, lng: 39.1068 }, status: 'idle' },
  { _id: 'd3', name: 'Karim Nabil', phone: '0934567890', role: UserRole.DRIVER, location: { lat: 34.6021, lng: 38.5968 }, status: 'active' },
  { _id: 'd4', name: 'Omar Farouk', phone: '0945678901', role: UserRole.DRIVER, location: { lat: 34.9021, lng: 38.8068 }, status: 'active' },
];

export const MOCK_TICKETS: SupportTicket[] = [
  { _id: 't1', farmerId: 'f1', farmerName: 'Mahmoud Farms', subject: 'Bulk Olive Transport', details: 'Need a 5-ton truck for olive harvest transport to Lattakia hub.', status: TicketStatus.PENDING, createdAt: '2023-10-25T10:30:00', type: 'DirectShipping' },
  { _id: 't2', farmerId: 'f2', farmerName: 'Green Valley', subject: 'Citrus Shipment', details: 'Urgent shipping for 2 tons of oranges.', status: TicketStatus.APPROVED, createdAt: '2023-10-24T09:15:00', type: 'DirectShipping' },
  { _id: 't3', farmerId: 'f3', farmerName: 'Hassan Orchards', subject: 'Payment Issue', details: 'Delay in last month settlement.', status: TicketStatus.PENDING, createdAt: '2023-10-26T14:20:00', type: 'Support' },
  { _id: 't4', farmerId: 'f4', farmerName: 'Noura Greenhouse', subject: 'Vegetable Crate Request', details: 'Requesting 500 crates for tomato harvest.', status: TicketStatus.REJECTED, createdAt: '2023-10-23T11:00:00', type: 'Support' },
];

export const MOCK_HUBS: Hub[] = [
  { _id: 'h1', name: 'Damascus Central', location: 'Damascus Industrial Zone', capacity: 85, manager: 'Lina Qassem' },
  { _id: 'h2', name: 'Coastal Storage', location: 'Tartus Port Area', capacity: 42, manager: 'Fadi Zaid' },
  { _id: 'h3', name: 'Aleppo North', location: 'Sheikh Najjar', capacity: 60, manager: 'Hassan Bitar' },
];

export const MOCK_PRODUCTS: Product[] = [
  { _id: 'p1', title: 'Organic Tomatoes', price: 4500, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400', category: 'Vegetables', farmerName: 'Noura Greenhouse', rating: 4.8 },
  { _id: 'p2', title: 'Fresh Olive Oil', price: 85000, unit: 'liter', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400', category: 'Oils', farmerName: 'Mahmoud Farms', rating: 5.0 },
  { _id: 'p3', title: 'Sweet Oranges', price: 3500, unit: 'kg', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400', category: 'Fruits', farmerName: 'Green Valley', rating: 4.5 },
  { _id: 'p4', title: 'Red Potatoes', price: 2800, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400', category: 'Vegetables', farmerName: 'Hassan Orchards', rating: 4.2 },
  { _id: 'p5', title: 'Fresh Mint', price: 1500, unit: 'bunch', image: 'https://images.unsplash.com/photo-1600352657136-46247d03972d?auto=format&fit=crop&q=80&w=400', category: 'Herbs', farmerName: 'Noura Greenhouse', rating: 4.9 },
];

export const MOCK_STORIES: Story[] = [
  { _id: 's1', title: 'From Soil to Table', preview: 'How we grew organic tomatoes...', image: 'https://images.unsplash.com/photo-1595855739630-1cb7d7b42955?auto=format&fit=crop&q=80&w=400', farmerName: 'Ahmed Al-Hassan' },
  { _id: 's2', title: 'The Olive Harvest', preview: 'Traditions passed down...', image: 'https://images.unsplash.com/photo-1508345228704-935cc84bf5e2?auto=format&fit=crop&q=80&w=400', farmerName: 'Samira Zaid' },
];

// Simulates socket location updates
export const moveDriver = (driver: Driver): Driver => {
  const moveAmount = 0.005;
  return {
    ...driver,
    location: {
      lat: driver.location.lat + (Math.random() - 0.5) * moveAmount,
      lng: driver.location.lng + (Math.random() - 0.5) * moveAmount
    }
  };
};