import { IContactInfo } from './contact-info.interface';
import { ContactInfo } from './contact-info.model';

const createContactInfoToDB = async (payload: IContactInfo) => {
      const existingContactInfo = await ContactInfo.findOne();

      let result;
      if (existingContactInfo) {
            result = await ContactInfo.findByIdAndUpdate(existingContactInfo._id, payload, {
                  new: true,
            });
      } else {
            result = await ContactInfo.create(payload);
      }
      if (!result) {
            throw new Error('Failed to create contact info');
      }
      return result;
};

const getContactInfoById = async (id: string) => {
      const result = await ContactInfo.findById(id);
      if (!result) {
            throw new Error('Contact info not found');
      }
      return result;
};

const getAllContactInfoFromDB = async () => {
      const result = await ContactInfo.find();
      return result;
};

const deleteContactInfoFromDB = async (id: string) => {
      const result = await ContactInfo.findByIdAndDelete(id);
      if (!result) {
            throw new Error('Contact info not found');
      }
      return result;
};

export const ContactInfoService = {
      createContactInfoToDB,
      getContactInfoById,

      getAllContactInfoFromDB,
      deleteContactInfoFromDB,
};
