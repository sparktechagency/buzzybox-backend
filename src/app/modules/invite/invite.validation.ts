import { z } from 'zod';

const inviteValidationSchema = z.object({
      body: z.object({
            email: z.string({ required_error: 'Email is required' }).email(),
            message: z.string({ required_error: 'Message is required' }),
            link: z.string({ required_error: 'Link is required' }),
      }),
});

export const InviteValidation = {
      inviteValidationSchema,
};
