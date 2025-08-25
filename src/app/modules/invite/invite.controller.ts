import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { InviteService } from './invite.service';

const sendInvite = catchAsync(async (req: Request, res: Response) => {
      const { ...inviteData } = req.body;
      const result = await InviteService.sendInvite(inviteData);

      sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'Invite sent successfully',
            data: result,
      });
});

export const InviteController = {
      sendInvite,
};
