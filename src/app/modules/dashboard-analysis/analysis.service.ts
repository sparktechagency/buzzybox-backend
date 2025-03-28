import { User } from '../user/user.model';
import { GiftCard } from '../giftcard/gift-card.model';
import { monthNames } from '../../../shared/constrant';

const getAllAnalysisFromDB = async () => {
      const totalUsers = await User.countDocuments();
      const totalGiftCards = await GiftCard.countDocuments();
      const revenue = await GiftCard.aggregate([
            {
                  $match: { paymentStatus: 'paid' },
            },
            {
                  $group: {
                        _id: null,
                        totalRevenue: { $sum: '$price' },
                  },
            },
      ]);
      const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

      return { totalUsers, totalGiftCards, totalRevenue };
};
const getMonthlyEarningsFromDB = async (year: string) => {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      const monthlyRevenue = await GiftCard.aggregate([
            {
                  $match: { createdAt: { $gte: startDate, $lte: endDate }, paymentStatus: 'paid' },
            },
            {
                  $group: {
                        _id: { $month: '$createdAt' },
                        totalRevenue: { $sum: '$price' },
                  },
            },
      ]);

      const formattedMonthlyRevenue: { [key: string]: number } = monthNames.reduce((acc, month) => {
            acc[month] = 0;
            return acc;
      }, {} as { [key: string]: number });

      monthlyRevenue.forEach((item) => {
            const month = monthNames[item._id - 1];
            formattedMonthlyRevenue[month] = item.totalRevenue;
      });

      return formattedMonthlyRevenue;
};

const getMonthlyUsersFromDB = async (year: string) => {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      const monthlyUsers = await User.aggregate([
            {
                  $match: { createdAt: { $gte: startDate, $lte: endDate } },
            },
            {
                  $group: {
                        _id: { $month: '$createdAt' },
                        totalUsers: { $sum: 1 },
                  },
            },
      ]);

      const formattedMonthlyUsers: { [key: string]: number } = monthNames.reduce((acc, month) => {
            acc[month] = 0;
            return acc;
      }, {} as { [key: string]: number });

      monthlyUsers.forEach((item) => {
            const month = monthNames[item._id - 1];
            formattedMonthlyUsers[month] = item.totalUsers;
      });

      return formattedMonthlyUsers;
};

const getMonthlyTotalGiftSendFromDB = async (year: string) => {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      const monthlyGiftSend = await GiftCard.aggregate([
            {
                  $match: {
                        createdAt: { $gte: startDate, $lte: endDate },
                        paymentStatus: 'paid',
                  },
            },
            {
                  $group: {
                        _id: { $month: '$createdAt' },
                        totalGiftSend: { $sum: 1 },
                  },
            },
      ]);

      const formattedMonthlyGiftSend: { [key: string]: number } = monthNames.reduce((acc, month) => {
            acc[month] = 0;
            return acc;
      }, {} as { [key: string]: number });

      monthlyGiftSend.forEach((item) => {
            const month = monthNames[item._id - 1];
            formattedMonthlyGiftSend[month] = item.totalGiftSend;
      });

      return formattedMonthlyGiftSend;
};

export const AnalysisService = {
      getAllAnalysisFromDB,
      getMonthlyEarningsFromDB,
      getMonthlyUsersFromDB,
      getMonthlyTotalGiftSendFromDB,
};
