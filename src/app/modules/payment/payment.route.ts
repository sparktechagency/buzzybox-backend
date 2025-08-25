import { Router } from 'express';
import { PaymentController } from './payment.controller';
const router = Router();
router.get('/:id', PaymentController.getPaymentByGiftCardId);
router.post('/create-checkout-session', PaymentController.createCheckoutSession);
router.post('/give-contribution', PaymentController.giveContribution);
router.post('/connect-account', PaymentController.connectAccount);
router.post('/withdraw-funds', PaymentController.withdrawContributionMoney);
export const PaymentRoutes = router;
