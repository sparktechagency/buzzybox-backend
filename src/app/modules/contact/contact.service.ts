import { StatusCodes } from 'http-status-codes';
import { TContact } from './contact.interface';
import { Contact } from './contact.model';
import ApiError from '../../../errors/ApiError';
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';

const createContactToDB = async (contactData: TContact) => {
      const result = await Contact.create(contactData);
      if (!result) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create contact');
      }
      //   Todo: send email\
      const contactEmailData = {
            email: result.email,
            name: result.name,
            message: result.message,
            subject: result.subject,
      };
      const contactEmailTemplate = emailTemplate.contact(contactEmailData);
      emailHelper.sendEmail(contactEmailTemplate);
      return result;
};
const getAllContactsFromDB = async () => {
      const contacts = await Contact.find();
      return contacts;
};

export const ContactService = {
      createContactToDB,
      getAllContactsFromDB,
};
