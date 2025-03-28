import { Router } from 'express';
import { GiftCardController } from './gift-card.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = Router();

router.post('/create-gift-card', auth(USER_ROLES.USER), GiftCardController.createGiftCard);
router.patch('/add-new-page/:id', fileUploadHandler(), GiftCardController.updateGiftCard);
router.patch('/remove-page/:id', GiftCardController.removePage);
router.get('/count-gift-cards', auth(USER_ROLES.ADMIN), GiftCardController.countGiftCards);
router.get('/my-cards', auth(USER_ROLES.USER), GiftCardController.getMyGiftCards);
router.get('/', GiftCardController.getAllGiftCards);
router.get('/:id', GiftCardController.getGiftCardByUniqueId);
router.delete('/:id', auth(USER_ROLES.USER), GiftCardController.deleteGiftCard);

export const GiftCardRoutes = router;
