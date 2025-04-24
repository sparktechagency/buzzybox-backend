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
const getAllTransactions = catchAsync(async (req, res) => {
      const result = await PaymentService.getAllTransactionsFromDB(req.query);
      sendResponse(res, {
            success: true,
            statusCode: 200,
            message: 'Transactions retrieved successfully',
            data: result,
      });
});
export const PaymentController = { createCheckoutSession, giveContribution, getAllTransactions };
