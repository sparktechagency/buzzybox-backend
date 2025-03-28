import unlinkFile from '../../../shared/unlinkFile';
import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryToDB = async (payload: ICategory) => {
      const result = await Category.create(payload);
      if (!result) {
            throw new Error('Failed to create category');
      }
      return result;
};

const getCategoryById = async (id: string) => {
      const result = await Category.findById(id);
      if (!result) {
            throw new Error('Category not found');
      }
      return result;
};

const updateCategoryToDB = async (id: string, payload: Partial<ICategory>, files: any) => {
      const existingCategory = await Category.findById(id);

      if (!existingCategory) {
            throw new Error('Category not found');
      }

      if (files && 'categoryImage' in files) {
            if (existingCategory?.categoryImage) {
                  unlinkFile(existingCategory.categoryImage);
            }
            payload.categoryImage = `/categories/${files.categoryImage[0].filename}`;
      }

      if (files && 'occasionImage' in files) {
            if (existingCategory?.occasionImage) {
                  unlinkFile(existingCategory.occasionImage);
            }
            payload.occasionImage = `/occasions/${files.occasionImage[0].filename}`;
      }

      const result = await Category.findByIdAndUpdate(id, payload, {
            new: true,
      });
      return result;
};
const getAllCategoriesFromDB = async () => {
      const result = await Category.find();
      if (!result) {
            throw new Error('Failed to get categories');
      }
      return result;
};
const deleteCategoryFromDB = async (id: string) => {
      const result = await Category.findOneAndDelete({ _id: id });
      if (!result) {
            throw new Error('This category is not found');
      }
      return result;
};

export const CategoryService = {
      createCategoryToDB,
      getCategoryById,
      getAllCategoriesFromDB,
      updateCategoryToDB,
      deleteCategoryFromDB,
};
