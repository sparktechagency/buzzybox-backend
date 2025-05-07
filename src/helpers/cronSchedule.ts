import cron from 'node-cron';
import { GiftCard } from '../app/modules/giftcard/gift-card.model';
import { Payment } from '../app/modules/payment/payment.model'; // Import your Payment model
import { emailTemplate } from '../shared/emailTemplate';
import { emailHelper } from './emailHelper';
import { IPayment } from '../app/modules/payment/payment.interface';
import { ObjectId } from 'mongoose';

export async function checkAndSendGiftCards() {
      console.log('Checking gift cards...');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const cardNeedToSend = await Payment.aggregate([
            {
                  $match: {
                        status: 'paid',
                  },
            },
            {
                  $lookup: {
                        from: 'giftcards',
                        localField: 'giftCardId',
                        foreignField: '_id',
                        as: 'giftCard',
                  },
            },
            { $unwind: '$giftCard' },
            {
                  $match: {
                        'giftCard.receiverInfo.emailScheduleDate': {
                              $gte: today,
                              $lt: tomorrow,
                        },
                  },
            },
      ]);

      cardNeedToSend.forEach((payment: IPayment) => {
            sendEmail(payment.giftCardId);
      });
}

async function sendEmail(giftCardId: ObjectId) {
      const giftCard = await GiftCard.findOne({ _id: giftCardId, status: { $ne: 'sent' } });

      console.log('need to send', giftCard);
      if (!giftCard) {
            return;
      }
      const userEmailDesign = emailTemplate.sendGiftCardEmail({
            email: giftCard?.receiverInfo?.receiverEmail as string,
            name: giftCard?.coverPage.recipientName as string,
            giftCardUrl: giftCard?.receiverInfo?.url as string,
      });
      const emailResult = await emailHelper.sendEmail(userEmailDesign);
      if (emailResult.success) {
            await GiftCard.findByIdAndUpdate(giftCardId, { status: 'sent' });
      }
}

export function scheduleDailyGiftCardCheck() {
      cron.schedule('0 0 * * *', checkAndSendGiftCards);
}
