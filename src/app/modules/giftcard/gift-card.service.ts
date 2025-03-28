import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import { Category } from '../category/category.model';

import { IGiftCard } from './gift-card.interface';
import { GiftCard } from './gift-card.model';
import mongoose from 'mongoose';
import cron from 'node-cron';

const createGiftCardToDB = async (payload: IGiftCard, userId: string) => {
      try {
            const category = await Category.findById(payload.category);
            if (!category) {
                  throw new Error('Category not found');
            }

            payload.userId = new mongoose.Types.ObjectId(userId);
            payload.image = category.occasionImage;
            payload.price = 5; // static price
            const result = await GiftCard.create(payload);
            if (!result) {
                  throw new Error('Failed to create gift card');
            }
            return result;
      } catch (error) {
            throw new Error(`Error creating payment link: ${(error as Error).message}`);
      }
};

const updateGiftCardToDB = async (payload: Partial<IGiftCard> & { page: any }, id: string, files: any) => {
      let newPage: any = payload.page ? JSON.parse(payload.page as string) : null;

      if (files && 'image' in files) {
            payload.image = `/images/${files.image[0].filename}`;
      }
      if (files && 'pageImage' in files) {
            newPage.image = `/images/${files.pageImage[0].filename}`;
      }

      const giftCard = await GiftCard.findById(id);
      if (!giftCard) {
            throw new Error('Gift card not found');
      }

      const updateObject: any = { ...payload };

      // If a new page is provided, push it to the pages array
      if (newPage) {
            updateObject.$push = { pages: newPage };
      }

      // Update the gift card in the database
      const result = await GiftCard.findByIdAndUpdate(id, updateObject, { new: true });

      return result;
};

const removePageFromGiftCard = async (id: string, pageId: string) => {
      const result = await GiftCard.findByIdAndUpdate(id, { $pull: { pages: { _id: pageId } } }, { new: true });
      if (!result) {
            throw new Error('Failed to remove page from gift card');
      }
      return result;
};

const getGiftCardByUniqueId = async (id: string) => {
      const result = await GiftCard.findOne({ uniqueId: id });
      if (!result) {
            throw new Error('Gift card not found');
      }
      return result;
};

const getAllGiftCardsFromDB = async (): Promise<IGiftCard[]> => {
      const result = await GiftCard.find({ paymentStatus: 'paid' });
      if (!result) {
            throw new Error('Failed to get gift cards');
      }
      return result;
};

const getMyGiftCardsFromDB = async (userId: string) => {
      console.log(userId);
      const result = await GiftCard.find({ userId, paymentStatus: 'paid' });

      if (!result) {
            throw new Error('Failed to get my gift cards');
      }
      return result;
};

const deleteGiftCardFromDB = async (id: string) => {
      const result = await GiftCard.findByIdAndDelete(id);
      if (!result) {
            throw new Error('Card not found');
      }
      return result;
};

const countGiftCardsByUserFromDB = async (query: Record<string, any>) => {
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;
      const sortBy = query.sortBy || 'user.name';
      const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
      const regexSearchTerm = typeof query.searchTerm === 'string' ? query.searchTerm : '';

      const aggregationPipeline: any[] = [
            {
                  $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                  },
            },
            { $unwind: '$user' },
            {
                  $match: regexSearchTerm
                        ? {
                                $or: [
                                      { 'user.name': { $regex: regexSearchTerm, $options: 'i' } },
                                      { 'user.email': { $regex: regexSearchTerm, $options: 'i' } },
                                ],
                          }
                        : {},
            },
            {
                  $group: {
                        _id: '$userId',
                        user: { $first: '$user' },
                        totalGiftCards: { $sum: 1 },
                  },
            },
            {
                  $project: {
                        user: {
                              _id: 1,
                              name: 1,
                              email: 1,

                              profile: 1,
                              status: 1,
                              verified: 1,

                              contact: 1,
                        },
                        totalGiftCards: 1,
                  },
            },
            {
                  $facet: {
                        metadata: [{ $count: 'total' }, { $addFields: { page, limit } }],
                        data: [{ $sort: { [sortBy]: sortOrder } }, { $skip: skip }, { $limit: limit }],
                  },
            },
            { $unwind: '$metadata' },
            {
                  $project: {
                        data: 1,
                        meta: {
                              page: '$metadata.page',
                              limit: '$metadata.limit',
                              total: '$metadata.total',
                              totalPage: { $ceil: { $divide: ['$metadata.total', '$metadata.limit'] } },
                        },
                  },
            },
      ];

      const [result] = await GiftCard.aggregate(aggregationPipeline);

      if (!result) {
            return {
                  meta: {
                        page,
                        limit,
                        total: 0,
                        totalPage: 0,
                  },
                  data: [],
            };
      }

      return {
            meta: result.meta,
            data: result.data,
      };
};

export const GiftCardService = {
      createGiftCardToDB,
      getAllGiftCardsFromDB,
      updateGiftCardToDB,
      removePageFromGiftCard,
      getMyGiftCardsFromDB,
      getGiftCardByUniqueId,
      deleteGiftCardFromDB,
      countGiftCardsByUserFromDB,
};
