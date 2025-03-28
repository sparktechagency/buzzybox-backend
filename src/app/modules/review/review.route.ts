import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post('/create-review', auth(USER_ROLES.ADMIN), fileUploadHandler(), ReviewController.createReview);
router.get('/', ReviewController.getAllReviews);
router.patch('/:id', auth(USER_ROLES.ADMIN), fileUploadHandler(), ReviewController.updateReview);
router.delete('/:id', auth(USER_ROLES.ADMIN), ReviewController.deleteReview);

export const ReviewRoutes = router;
