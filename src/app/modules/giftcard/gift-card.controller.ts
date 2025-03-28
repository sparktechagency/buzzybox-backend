import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { GiftCardService } from './gift-card.service';

const createGiftCard = catchAsync(async (req, res) => {
      const payload = req.body;
      const userId = req.user?.id;
      const result = await GiftCardService.createGiftCardToDB(payload, userId as string);
      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Gift card created successfully',
            data: result,
      });
});

const updateGiftCard = catchAsync(async (req, res) => {
      const payload = req.body;
      const result = await GiftCardService.updateGiftCardToDB(payload, req.params.id, req.files);
      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Gift card updated successfully',
            data: result,
      });
});

const removePage = catchAsync(async (req, res) => {
      const result = await GiftCardService.removePageFromGiftCard(req.params.id, req.body.pageId);
      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Page removed successfully',
            data: result,
      });
});

const getGiftCardByUniqueId = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await GiftCardService.getGiftCardByUniqueId(id);
      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Gift card fetched successfully',
            data: result,
      });
});

const getAllGiftCards = catchAsync(async (req, res) => {
      const result = await GiftCardService.getAllGiftCardsFromDB();
      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Gift cards fetched successfully',
            data: result,
      });
});

const getMyGiftCards = catchAsync(async (req, res) => {
      const userId = req.user?.id;
      const result = await GiftCardService.getMyGiftCardsFromDB(userId as string);
      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Gift cards fetched successfully',
            data: result,
      });
});

const deleteGiftCard = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await GiftCardService.deleteGiftCardFromDB(id);
      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Gift card deleted successfully',
            data: result,
      });
});

const countGiftCards = catchAsync(async (req, res) => {
      const result = await GiftCardService.countGiftCardsByUserFromDB(req.query);

      sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Gift cards fetched successfully',
            data: result,
      });
});

export const GiftCardController = {
      createGiftCard,
      getAllGiftCards,
      updateGiftCard,
      removePage,

      getMyGiftCards,
      getGiftCardByUniqueId,
      deleteGiftCard,
      countGiftCards,
};
