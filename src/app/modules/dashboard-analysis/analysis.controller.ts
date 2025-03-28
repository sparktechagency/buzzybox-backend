import catchAsync from '../../../shared/catchAsync';
import { AnalysisService } from './analysis.service';

const getAllAnalysis = catchAsync(async (req, res) => {
      const result = await AnalysisService.getAllAnalysisFromDB();
      res.status(200).json({
            success: true,
            message: 'Stats fetched successfully',
            data: result,
      });
});

const getMonthlyEarnings = catchAsync(async (req, res) => {
      const result = await AnalysisService.getMonthlyEarningsFromDB(req.query.year as string);
      res.status(200).json({
            success: true,
            message: 'Monthly earnings fetched successfully',
            data: result,
      });
});

const getMonthlyUsers = catchAsync(async (req, res) => {
      const result = await AnalysisService.getMonthlyUsersFromDB(req.query.year as string);
      res.status(200).json({
            success: true,
            message: 'Monthly users fetched successfully',
            data: result,
      });
});

const getMonthlyTotalGiftSend = catchAsync(async (req, res) => {
      const result = await AnalysisService.getMonthlyTotalGiftSendFromDB(req.query.year as string);
      res.status(200).json({
            success: true,
            message: 'Monthly total gift send fetched successfully',
            data: result,
      });
});

export const AnalysisController = {
      getAllAnalysis,
      getMonthlyEarnings,
      getMonthlyUsers,
      getMonthlyTotalGiftSend,
};
