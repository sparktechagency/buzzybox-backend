import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';

// checkout
const createCheckoutSession = catchAsync(async (req, res) => {
      const result = await PaymentService.createCheckoutSession(req.user!.id, req.body.giftCardId);
      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Checkout session created successfully',
            data: result,
      });
});

const giveContribution = catchAsync(async (req, res) => {
      const result = await PaymentService.createContributionSession(req.body);
      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Contribution given successfully',
            data: result,
      });
});

const connectAccount = catchAsync(async (req, res) => {
      const result = await PaymentService.createRecipientWithdrawalLink(req.body);
      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Account connected successfully',
            data: result,
      });
});

const withdrawContributionMoney = catchAsync(async (req, res) => {
      const result = await PaymentService.withdrawGiftCardFunds(req.body);
      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: ' Withdraw money successfully',
            data: result,
      });
});

export const PaymentController = { createCheckoutSession, giveContribution, connectAccount, withdrawContributionMoney };
