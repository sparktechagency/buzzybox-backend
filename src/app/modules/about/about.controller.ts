import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AboutService } from './about.service';

const createAbout = catchAsync(async (req: Request, res: Response) => {
      const result = await AboutService.createAboutToDB(req.body, req.files);
      sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: 'About created successfully',
            data: result,
      });
});

const updateAbout = catchAsync(async (req: Request, res: Response) => {
      console.log('update =================================');
      const result = await AboutService.updateAboutToDB(req?.params?.id, req.body, req.files);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'About updated successfully',
            data: result,
      });
});

const getAbout = catchAsync(async (req: Request, res: Response) => {
      const result = await AboutService.getAboutFromDB();
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'About retrieved successfully',
            data: result,
      });
});

const deleteAbout = catchAsync(async (req: Request, res: Response) => {
      const result = await AboutService.deleteAboutFromDB(req?.params?.id);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'About deleted successfully',
            data: result,
      });
});

export const AboutController = {
      createAbout,
      updateAbout,
      getAbout,
      deleteAbout,
};
