import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
      if (req.files && 'categoryImage' in req.files) {
            req.body.categoryImage = `/categories/${req.files.categoryImage[0].filename}`;
      }
      if (req.files && 'occasionImage' in req.files) {
            req.body.occasionImage = `/occasions/${req.files.occasionImage[0].filename}`;
      }

      const { ...categoryData } = req.body;
      const result = await CategoryService.createCategoryToDB(categoryData);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Category created successfully',
            data: result,
      });
});

const updateCategory = catchAsync(async (req, res) => {
      const { id } = req.params;
      const { ...categoryData } = req.body;

      const result = await CategoryService.updateCategoryToDB(id, categoryData, req.files);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Category updated successfully',
            data: result,
      });
});
const getAllCategories = catchAsync(async (req, res) => {
      const result = await CategoryService.getAllCategoriesFromDB();
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Categories fetched successfully',
            data: result,
      });
});
const deleteCategory = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await CategoryService.deleteCategoryFromDB(id);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Category deleted successfully',
            data: result,
      });
});

export const CategoryController = {
      createCategory,
      updateCategory,
      getAllCategories,
      deleteCategory,
};
