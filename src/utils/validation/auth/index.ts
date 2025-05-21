import z from 'zod';

export const loginSchema = z.object({
  phone: z
    .string({
      required_error: 'Phone number is required',
    })
    .min(10, {
      message: 'Phone number must be 10 digits',
    })
    .max(10, 'Phone number must be 10 digits')
    .regex(/^[0-9]+$/, 'Phone number must be numeric'),
  otp: z.string().min(5, 'OTP is Required').max(5, 'OTP is Required').optional(), // otp is required
});
