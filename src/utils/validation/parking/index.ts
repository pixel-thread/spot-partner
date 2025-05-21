import { z } from 'zod';

const slotSchema = z.object({
  id: z.string().uuid().optional(),
  slotNumber: z.number().optional(),
  isOccupied: z.boolean().optional(),
  type: z.string().optional(),
});

export const parkingSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  address: z.string().min(3, { message: 'Address must be at least 3 characters' }),
  city: z.string().min(3, { message: 'Address must be at least 3 characters' }),
  price: z.string().min(2, { message: 'Price must be at least 2 characters' }),
  pinCode: z.string().min(6, { message: 'Pin code must be at least 6 characters' }),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
  features: z.string().min(3, { message: 'Features must be at least 3 characters' }),
  userId: z.string().uuid().min(1, { message: 'User id must be at least 1 characters' }),
  openHours: z.string().optional(),
  id: z.string().uuid().optional(),
  distance: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  rating: z.array(z.string().uuid().optional()).optional(),
  slots: z.array(slotSchema).optional(),
  image: z.string().url().optional(),
});
