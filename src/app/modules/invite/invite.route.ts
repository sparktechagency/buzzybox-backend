import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InviteValidation } from './invite.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { InviteController } from './invite.controller';

const router = Router();

router.post('/send-invite', auth(USER_ROLES.USER), validateRequest(InviteValidation.inviteValidationSchema), InviteController.sendInvite);

export const InviteRoutes = router;
