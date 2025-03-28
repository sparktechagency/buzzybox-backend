import { Router } from 'express';
import { CategoryController } from './category.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = Router();

router.post('/create-category', fileUploadHandler(), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

router.patch('/:id', fileUploadHandler(), CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
export const CategoryRoutes = router;
