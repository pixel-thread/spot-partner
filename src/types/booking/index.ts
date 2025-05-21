// src/types/booking.ts

import { z } from 'zod';
import { parkingSchema } from '~/src/utils/validation/parking';

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  PROCESSING = 'PROCESSING',
  PENDING = 'PENDING',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  ONLINE = 'ONLINE',
  // extend as needed
}

export interface BookingI {
  id: string;
  userId: string;
  parkingSlotId: string;
  parkingLotId: string;
  startTime: string; // ISO timestamp
  endTime: string; // ISO timestamp
  vehicleNumber: string | null;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId: string | null;
  otp: string;
  otpExpiry: string; // ISO timestamp
  otpVerified: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  cancelledAt: string | null; // ISO timestamp if cancelled, otherwise null
  parkingLot: z.infer<typeof parkingSchema>;
}
