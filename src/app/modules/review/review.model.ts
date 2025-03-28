import mongoose, { Schema } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
      {
            username: {
                  type: String,
                  required: true,
            },
            message: {
                  type: String,
                  required: true,
            },
            userImage: {
                  type: String,
                  required: true,
            },
            occupation: {
                  type: String,
                  required: true,
            },
      },
      {
            timestamps: true,
      }
);

export const Review = mongoose.model<IReview>('Review', reviewSchema);
