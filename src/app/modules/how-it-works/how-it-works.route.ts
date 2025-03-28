import express from 'express';
import { HowItWorksController } from './how-it-works.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.post('/create-how-it-works', auth(USER_ROLES.ADMIN), fileUploadHandler(), HowItWorksController.createHowItWorks);

router.patch('/:id', auth(USER_ROLES.ADMIN), fileUploadHandler(), HowItWorksController.updateHowItWorks);

router.get('/', HowItWorksController.getAllHowItWorks);
router.get('/active', HowItWorksController.getActiveHowItWorks);
router.get('/:id', HowItWorksController.getHowItWorksById);

router.delete('/:id', auth(USER_ROLES.ADMIN), HowItWorksController.deleteHowItWorks);

export const HowItWorksRoutes = router;
