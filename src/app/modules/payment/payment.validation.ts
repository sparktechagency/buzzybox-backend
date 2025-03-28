import { z } from 'zod';
export interface IPayment {
      giftCardId: string;
      emailScheduleDate: Date;
      message?: string;
      receiverEmail: string;
      url: string;
}

const createCheckoutSessionZodSchema = z.object({
      giftCardId: z.string({ required_error: 'Gift card ID is required' }),
      emailScheduleDate: z.coerce.date(),
      message: z.string().optional(),
      receiverEmail: z.string().email({
            message: 'Invalid email address format',
      }),
      url: z.string().url({
            message: 'Invalid URL format',
      }),
});

export const PaymentValidation = { createCheckoutSessionZodSchema };
