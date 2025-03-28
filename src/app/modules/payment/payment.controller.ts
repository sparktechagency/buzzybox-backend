import catchAsync from '../../../shared/catchAsync';
import { PaymentService } from './payment.service';
import { PaymentValidation } from './payment.validation';

// checkout
const createCheckoutSession = catchAsync(async (req, res) => {
      const validatedData = await PaymentValidation.createCheckoutSessionZodSchema.parseAsync(req.body);

      const result = await PaymentService.createCheckoutSession(validatedData);
      res.status(200).json({
            success: true,
            message: 'Checkout session created successfully',
            data: result,
      });
});
const getAllTransactions = catchAsync(async (req, res) => {
      const result = await PaymentService.getAllTransactionsFromDB(req.query);
      res.status(200).json({
            success: true,
            message: 'Transactions retrieved successfully',
            data: result,
      });
});
export const PaymentController = { createCheckoutSession, getAllTransactions };
