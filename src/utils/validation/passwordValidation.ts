import { z } from 'zod';

export const passwordValidation = z
  .string({
    required_error: 'Password is required',
  })
  .min(8, {
    message: 'Password must be at least 8 characters long',
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((val) => /[a-z]/.test(val), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((val) => /\d/.test(val), {
    message: 'Password must contain at least one number',
  })
  .refine((val) => /[@$!%*?&]/.test(val), {
    message: 'Password must contain at least one special character (@$!%*?&)',
  });
