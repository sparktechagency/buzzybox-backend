import { model, Schema } from 'mongoose';
import { IPayment } from './payment.interface';

const paymentSchema = new Schema<IPayment>(
      {
            userId: {
                  type: Schema.Types.ObjectId,
                  required: true,
                  ref: 'User',
            },

            giftCardId: {
                  type: Schema.Types.ObjectId,
                  required: true,
                  ref: 'GiftCard',
            },

            transactionId: {
                  type: String,
                  required: true,
            },
            status: {
                  type: String,
                  enum: ['pending', 'paid', 'failed'],
                  default: 'pending',
            },
            amount: {
                  type: Number,
                  required: true,
            },
            contributors: [
                  {
                        email: {
                              type: String,
                        },
                        amount: {
                              type: Number,
                        },
                  },
            ],
            totalContribution: {
                  type: Number,
                  default: 0,
            },
      },
      {
            timestamps: true,
      }
);

export const Payment = model<IPayment>('Payment', paymentSchema);
