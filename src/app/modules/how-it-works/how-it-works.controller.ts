import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { HowItWorksService } from './how-it-works.service';

const createHowItWorks = catchAsync(async (req: Request, res: Response) => {
      const { ...howItWorksData } = req.body;
      const result = await HowItWorksService.createHowItWorksToDB(howItWorksData, req.files);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'How it works created successfully',
            data: result,
      });
});

const updateHowItWorks = catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const { ...howItWorksData } = req.body;

      const result = await HowItWorksService.updateHowItWorksToDB(id, howItWorksData, req.files);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'How it works updated successfully',
            data: result,
      });
});

const getAllHowItWorks = catchAsync(async (req: Request, res: Response) => {
      const result = await HowItWorksService.getAllHowItWorksFromDB();
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'How it works fetched successfully',
            data: result,
      });
});

const getActiveHowItWorks = catchAsync(async (req: Request, res: Response) => {
      const result = await HowItWorksService.getActiveHowItWorksFromDB();
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Active how it works fetched successfully',
            data: result,
      });
});

const getHowItWorksById = catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await HowItWorksService.getHowItWorksById(id);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'How it works fetched successfully',
            data: result,
      });
});

const deleteHowItWorks = catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await HowItWorksService.deleteHowItWorksFromDB(id);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'How it works deleted successfully',
            data: result,
      });
});

export const HowItWorksController = {
      createHowItWorks,
      updateHowItWorks,
      getAllHowItWorks,
      getActiveHowItWorks,
      getHowItWorksById,
      deleteHowItWorks,
};
