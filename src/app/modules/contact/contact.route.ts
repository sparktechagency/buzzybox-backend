import { Router } from 'express';
import { ContactController } from './contact.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = Router();

router.post('/create-contact', auth(USER_ROLES.USER), ContactController.createContact);
router.get('/', auth(USER_ROLES.ADMIN), ContactController.getAllContacts);

export const ContactRoutes = router;
