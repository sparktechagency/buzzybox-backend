import stripe from '../../config/stripe.config';
import { GiftCard } from '../giftcard/gift-card.model';
import config from '../../../config';
import { ObjectId } from 'mongoose';
import { Payment } from './payment.model';
import { IPayment } from './payment.interface';

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
            success_url: `${config.frontend_url}/create-gift/${giftCard.uniqueId}`,
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
            success_url: `${config.frontend_url}/create-gift/${giftCard.uniqueId}`,
            cancel_url: `${config.frontend_url}/create-gift/${giftCard.uniqueId}`,
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

const createRecipientWithdrawalLink = async (payload: { giftCardId: ObjectId; email: string }) => {
      if (!payload.giftCardId) {
            throw new Error('Gift card ID is required');
      }

      const giftCard = await GiftCard.findById(payload.giftCardId);
      if (!giftCard) {
            throw new Error('Gift card not found');
      }

      // Find or create a related payment record
      let payment = await Payment.findOne({ giftCardId: payload.giftCardId });

      if (!payment) {
            payment = new Payment({ giftCardId: payload.giftCardId });
      }

      // Check if Stripe Connect account is already saved
      let accountId = payment.stripeConnectAccountId;

      if (!accountId) {
            const account = await stripe.accounts.create({
                  type: 'express',
                  country: 'US',
                  email: payload.email,
                  capabilities: {
                        transfers: { requested: true },
                  },
            });

            accountId = account.id;
            payment.stripeConnectAccountId = accountId;

            await payment.save();
      }

      // Generate Stripe onboarding link
      const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${config.frontend_url}/preview-gift/${giftCard.uniqueId}`,
            return_url: `${config.frontend_url}/preview-gift/${giftCard.uniqueId}`,
            type: 'account_onboarding',
      });

      return accountLink.url;
};

const withdrawGiftCardFunds = async (payload: IPayment) => {
      if (!payload.giftCardId) {
            throw new Error('Gift card ID is required');
      }

      const payment = await Payment.findOne({ giftCardId: payload.giftCardId });
      if (!payment) {
            throw new Error('Payment record not found');
      }

      console.log(payment, 'from withdrawel');
      if (!payment.stripeConnectAccountId) {
            const connectAccountUrl = `${config.frontend_url}/connect/${payload.giftCardId}`;
            return {
                  connectAccountUrl,
            };
      }

      if (payment.hasWithdrawn) {
            throw new Error('Funds already withdrawn');
      }

      if (!payment.totalContribution || payment.totalContribution <= 0) {
            throw new Error('No funds available to withdraw');
      }

      const transfer = await stripe.transfers.create({
            amount: Math.floor(payment.totalContribution * 100), // in cents
            currency: 'usd',
            destination: payment.stripeConnectAccountId,
            metadata: {
                  giftCardId: payload.giftCardId.toString(),
                  type: 'gift_card_withdrawal',
            },
      });

      // Mark as withdrawn
      payment.hasWithdrawn = true;

      await payment.save();
};

const getPaymentByGiftCardId = async (giftCardId: ObjectId) => {
      const payment = await Payment.findOne({ giftCardId: giftCardId });
      if (!payment) {
            throw new Error('Payment record not found');
      }
      return payment;
};

export const PaymentService = {
      createCheckoutSession,
      createContributionSession,
      createRecipientWithdrawalLink,
      withdrawGiftCardFunds,
      getPaymentByGiftCardId,
};
