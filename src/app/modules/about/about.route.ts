import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { AboutController } from './about.controller';
import { Router } from 'express';

const router = Router();
router.post('/create-about', fileUploadHandler(), AboutController.createAbout);
router.patch('/:id', fileUploadHandler(), AboutController.updateAbout);
router.get('/', AboutController.getAbout);
router.delete('/:id', AboutController.deleteAbout);

export const AboutRoutes = router;
