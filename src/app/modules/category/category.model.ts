import { model, MongooseError, Schema } from 'mongoose';
import { ICategory } from './category.interface';
const categorySchema = new Schema<ICategory>(
      {
            name: {
                  type: String,
                  required: true,
                  unique: true,
            },
            categoryImage: {
                  type: String,
                  required: true,
            },
            occasionImage: {
                  type: String,
                  required: true,
            },
      },
      {
            timestamps: true,
      }
);

categorySchema.post('save', function (error: MongooseError, doc: ICategory, next: (err?: Error) => void) {
      if (error.name === 'MongoServerError' && 'code' in error && error.code === 11000) {
            next(new Error('Category already exists'));
      } else {
            next(error);
      }
});

export const Category = model<ICategory>('Category', categorySchema);
