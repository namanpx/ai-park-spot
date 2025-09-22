import { VehicleType } from './auth';

// Booking and Payment Types
export interface Booking {
  id: string;
  userId: string;
  parkingSlotId: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  status: BookingStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  qrCode: string;
  confirmationCode: string;
  notes?: string;
  violationsReported?: Violation[];
  createdAt: string;
  updatedAt: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export interface BookingRequest {
  parkingSlotId: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  paymentMethod: PaymentMethod;
}

export interface BookingExtension {
  bookingId: string;
  newEndTime: string;
  additionalAmount: number;
}

// Payment Types
export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  fastagTransactionId?: string;
  receipt?: PaymentReceipt;
  refundAmount?: number;
  refundReason?: string;
  processingFee: number;
  tax: number;
  createdAt: string;
  completedAt?: string;
}

export enum PaymentMethod {
  FASTAG = 'fastag',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  UPI = 'upi',
  NET_BANKING = 'net_banking',
  WALLET = 'wallet',
  CASH = 'cash'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export interface PaymentReceipt {
  receiptNumber: string;
  issueDate: string;
  amount: number;
  tax: number;
  processingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
}

export interface PricingCalculation {
  baseRate: number;
  duration: number;
  subtotal: number;
  tax: number;
  processingFee: number;
  discount?: number;
  total: number;
  breakdown: PricingBreakdown[];
}

export interface PricingBreakdown {
  description: string;
  amount: number;
  type: 'charge' | 'discount' | 'tax' | 'fee';
}

// Violation Types
export interface Violation {
  id: string;
  bookingId?: string;
  parkingSlotId: string;
  violationType: ViolationType;
  description: string;
  detectedAt: string;
  evidence: ViolationEvidence[];
  status: ViolationStatus;
  fine?: number;
  resolvedAt?: string;
  resolvedBy?: string;
  notes?: string;
}

export enum ViolationType {
  OVERSTAY = 'overstay',
  WRONG_SLOT = 'wrong_slot',
  NO_BOOKING = 'no_booking',
  BLOCKING = 'blocking',
  ABANDONED_VEHICLE = 'abandoned_vehicle',
  UNAUTHORIZED_VEHICLE = 'unauthorized_vehicle'
}

export enum ViolationStatus {
  DETECTED = 'detected',
  UNDER_REVIEW = 'under_review',
  CONFIRMED = 'confirmed',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed'
}

export interface ViolationEvidence {
  id: string;
  type: 'image' | 'video';
  url: string;
  timestamp: string;
  cameraId: string;
  confidence: number;
}