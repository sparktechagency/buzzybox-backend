import { Router } from 'express';
import { AnalysisController } from './analysis.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

router.get('/stats', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), AnalysisController.getAllAnalysis);
router.get('/monthly-earnings', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), AnalysisController.getMonthlyEarnings);
router.get('/monthly-users', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), AnalysisController.getMonthlyUsers);
router.get('/monthly-total-gift-send', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), AnalysisController.getMonthlyTotalGiftSend);

export const AnalysisRoutes = router;
