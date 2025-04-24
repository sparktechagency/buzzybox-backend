import stripe from '../../config/stripe.config';
import { GiftCard } from '../giftcard/gift-card.model';
import config from '../../../config';
import { ObjectId } from 'mongoose';

const createCheckoutSession = async (userId: string, giftCardId: ObjectId) => {
      if (!giftCardId) {
            throw new Error('Please provide a valid gift card id');
      }
      const giftCard = await GiftCard.findById(giftCardId);
      if (!giftCard) {
            throw new Error('Gift card not found');
      }

      const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${config.frontend_url}`,
            cancel_url: `${config.frontend_url}`,
            line_items: [
                  {
                        price: config.stripe_price_id,
                        quantity: 1,
                  },
            ],
            metadata: {
                  userId,
                  giftCardId: giftCardId.toString(),
                  paymentType: 'giftCard',
            },
      });

      return checkoutSession.url;
};

const createContributionSession = async (payload: { giftCardId: ObjectId; amount: number; email: string }) => {
      if (!payload.giftCardId) {
            throw new Error('Gift card ID required');
      }
      const giftCard = await GiftCard.findById(payload.giftCardId);
      if (!giftCard) {
            throw new Error('Gift card not found');
      }

      const price = await stripe.prices.create({
            unit_amount: payload.amount * 100,
            currency: 'usd',
            product_data: {
                  name: `Contribution to Gift Card ${giftCard.coverPage.title}`,
            },
      });

      const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${config.frontend_url}/contribution-success`,
            cancel_url: `${config.frontend_url}/gift-card/${payload.giftCardId}`,
            line_items: [{ price: price.id, quantity: 1 }],
            metadata: {
                  giftCardId: payload.giftCardId.toString(),
                  paymentType: 'contribution',
                  contributorEmail: payload.email,
                  amount: payload.amount,
            },
      });

      return session.url;
};
const getAllTransactionsFromDB = async (query: Record<string, any>) => {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;
      const sortBy = query.sortBy || 'user.name';
      const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
      const regexSearchTerm = typeof query.searchTerm === 'string' ? query.searchTerm : '';
      const result = await GiftCard.aggregate([
            {
                  $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                  },
            },
            {
                  $unwind: '$user',
            },
            {
                  $match: {
                        $or: [
                              { 'user.name': { $regex: regexSearchTerm, $options: 'i' } },
                              { 'user.email': { $regex: regexSearchTerm, $options: 'i' } },
                        ],
                  },
            },

            {
                  $project: {
                        _id: 1,
                        user: {
                              _id: 1,
                              name: 1,
                              email: 1,
                              profile: 1,
                              status: 1,
                              contact: 1,
                        },
                        giftCardId: 1,
                        paymentIntentId: 1,
                        amount: 1,
                        price: 1,
                        paymentStatus: 1,
                        coverPage: 1,
                  },
            },

            {
                  $facet: {
                        metadata: [{ $count: 'total' }, { $addFields: { page, limit } }],
                        data: [{ $sort: { [sortBy]: sortOrder } }, { $skip: skip }, { $limit: limit }],
                  },
            },
            { $unwind: '$metadata' },
            {
                  $project: {
                        data: 1,
                        meta: {
                              page: '$metadata.page',
                              limit: '$metadata.limit',
                              total: '$metadata.total',
                              totalPage: { $ceil: { $divide: ['$metadata.total', '$metadata.limit'] } },
                        },
                  },
            },
      ]).exec();

      if (!result) {
            return {
                  meta: {
                        page,
                        limit,
                        total: 0,
                        totalPage: 0,
                  },
                  data: [],
            };
      }

      return result;
};
export const PaymentService = { createCheckoutSession, getAllTransactionsFromDB, createContributionSession };
