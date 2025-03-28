import unlinkFile from '../../../shared/unlinkFile';
import { IAbout } from './about.interface';
import { About } from './about.model';

const createAboutToDB = async (payload: IAbout, files: any) => {
      if (files && 'aboutImage' in files) {
            payload.aboutImage = `/about/${files.aboutImage[0].filename}`;
      }
      const result = await About.create(payload);
      if (!result) {
            throw new Error('Failed to create about');
      }
      return result;
};

const updateAboutToDB = async (id: string, payload: IAbout, files: any) => {
      const existingAbout = await About.findById(id);
      if (!existingAbout) {
            throw new Error('About not found');
      }
      if (files && 'aboutImage' in files) {
            if (existingAbout.aboutImage) {
                  unlinkFile(existingAbout.aboutImage);
            }
            payload.aboutImage = `/about/${files.aboutImage[0].filename}`;
      }
      const result = await About.findOneAndUpdate({ _id: id }, { $set: payload }, { new: true });
      if (!result) {
            throw new Error('Failed to update about');
      }
      return result;
};

const getAboutFromDB = async () => {
      const result = await About.find({});
      if (!result) {
            throw new Error('Failed to get about');
      }
      return result;
};

const deleteAboutFromDB = async (id: string) => {
      const result = await About.findOneAndDelete({ _id: id });
      if (!result) {
            throw new Error('This about is not found');
      }
      return result;
};

export const AboutService = {
      createAboutToDB,
      updateAboutToDB,
      getAboutFromDB,
      deleteAboutFromDB,
};
