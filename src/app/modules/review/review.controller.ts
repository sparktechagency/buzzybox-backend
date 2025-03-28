import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req, res) => {
      const { ...reviewData } = req.body;
      const result = await ReviewService.createReviewToDB(reviewData, req.files);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Review created successfully',
            data: result,
      });
});

const getAllReviews = catchAsync(async (req, res) => {
      const result = await ReviewService.getAllReviewsFromDB();
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Reviews fetched successfully',
            data: result,
      });
});

const updateReview = catchAsync(async (req, res) => {
      const { id } = req.params;
      const { ...reviewData } = req.body;

      const result = await ReviewService.updateReviewToDB(id, reviewData, req.files);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Review updated successfully',
            data: result,
      });
});

const deleteReview = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await ReviewService.deleteReviewFromDB(id);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Review deleted successfully',
            data: result,
      });
});

export const ReviewController = {
      createReview,
      getAllReviews,

      updateReview,
      deleteReview,
};
