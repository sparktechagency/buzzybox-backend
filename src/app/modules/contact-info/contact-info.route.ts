import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ContactInfoController } from './contact-info.controller';

const router = express.Router();

router.post('/create-contact-info', auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), ContactInfoController.createContactInfo);

router.get('/', ContactInfoController.getAllContactInfo);
router.get('/:id', ContactInfoController.getContactInfoById);

router.delete('/:id', auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN), ContactInfoController.deleteContactInfo);

export const ContactInfoRoutes = router;
