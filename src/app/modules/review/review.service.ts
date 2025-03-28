import QueryBuilder from '../../../builder/QueryBuilder';
import unlinkFile from '../../../shared/unlinkFile';

import { IReview } from './review.interface';
import { Review } from './review.model';

const createReviewToDB = async (payload: IReview, files: any) => {
      if (files && 'userImage' in files) {
            payload.userImage = `/reviews/${files.userImage[0].filename}`;
      }

      const result = await Review.create(payload);
      if (!result) {
            throw new Error('Failed to create review');
      }
      return result;
};

const getAllReviewsFromDB = async () => {
      const result = await Review.find();

      if (!result) {
            throw new Error('Failed to get reviews');
      }
      return result;
};

const updateReviewToDB = async (id: string, payload: Partial<IReview>, files: any) => {
      const existingReview = await Review.findById(id);
      if (!existingReview) {
            throw new Error('Review not found');
      }

      if (files && 'userImage' in files) {
            if (existingReview?.userImage) {
                  unlinkFile(existingReview.userImage);
            }
            payload.userImage = `/reviews/${files.userImage[0].filename}`;
      }

      const result = await Review.findByIdAndUpdate(id, payload, {
            new: true,
      });
      return result;
};

const deleteReviewFromDB = async (id: string) => {
      const existingReview = await Review.findById(id);
      if (!existingReview) {
            throw new Error('Review not found');
      }

      if (existingReview.userImage) {
            unlinkFile(existingReview.userImage);
      }

      const result = await Review.findByIdAndDelete(id);
      return result;
};

export const ReviewService = {
      createReviewToDB,
      getAllReviewsFromDB,

      updateReviewToDB,
      deleteReviewFromDB,
};
