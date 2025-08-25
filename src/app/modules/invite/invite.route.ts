import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { InviteValidation } from './invite.validation';
import { InviteController } from './invite.controller';

const router = Router();

router.post('/send-invite', validateRequest(InviteValidation.inviteValidationSchema), InviteController.sendInvite);

export const InviteRoutes = router;
