import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactInfoService } from './contact-info.service';

const createContactInfo = catchAsync(async (req, res) => {
      const { ...contactInfoData } = req.body;
      const result = await ContactInfoService.createContactInfoToDB(contactInfoData);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Contact info created successfully',
            data: result,
      });
});

const getAllContactInfo = catchAsync(async (req, res) => {
      const result = await ContactInfoService.getAllContactInfoFromDB();
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Contact info fetched successfully',
            data: result,
      });
});

const getContactInfoById = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await ContactInfoService.getContactInfoById(id);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Contact info fetched successfully',
            data: result,
      });
});

const deleteContactInfo = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await ContactInfoService.deleteContactInfoFromDB(id);
      sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Contact info deleted successfully',
            data: result,
      });
});

export const ContactInfoController = {
      createContactInfo,

      getAllContactInfo,
      getContactInfoById,
      deleteContactInfo,
};
