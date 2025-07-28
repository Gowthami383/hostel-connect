export interface Booking {
  id: string;
  studentId: string;
  hostelId: string;
  bedNumber?: string;
  roomNumber?: string;
  
  // Dates
  checkInDate: Date;
  checkOutDate?: Date;
  
  // Payment
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'pending' | 'partial' | 'completed' | 'failed';
  paymentMethod?: string;
  transactionId?: string;
  
  // Status
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'cancelled';
  
  createdAt: Date;
  updatedAt: Date;
}