import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { PaymentController } from './payment.controller';
const router = Router();
router.post('/create-checkout-session', auth(USER_ROLES.USER), PaymentController.createCheckoutSession);
router.get('/all-transactions', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), PaymentController.getAllTransactions);
export const PaymentRoutes = router;
