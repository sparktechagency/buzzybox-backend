import unlinkFile from '../../../shared/unlinkFile';
import { IHowItWorks } from './how-it-works.interface';
import { HowItWorks } from './how-it-works.model';

const createHowItWorksToDB = async (payload: IHowItWorks, files: any) => {
      if (files && 'howItWorksImage' in files) {
            payload.howItWorksImage = `/how-it-works/${files.howItWorksImage[0].filename}`;
      }
      const result = await HowItWorks.create(payload);
      if (!result) {
            throw new Error('Failed to create how it works');
      }
      return result;
};

const updateHowItWorksToDB = async (id: string, payload: Partial<IHowItWorks>, files: any) => {
      const existingHowItWorks = await HowItWorks.findById(id);

      if (!existingHowItWorks) {
            throw new Error('How it works not found');
      }

      if (files && 'howItWorksImage' in files) {
            if (existingHowItWorks?.howItWorksImage) {
                  unlinkFile(existingHowItWorks.howItWorksImage);
            }
            payload.howItWorksImage = `/how-it-works/${files.howItWorksImage[0].filename}`;
      }

      const result = await HowItWorks.findByIdAndUpdate(id, payload, {
            new: true,
      });
      if (!result) {
            throw new Error('How it works not found');
      }
      return result;
};

const getAllHowItWorksFromDB = async () => {
      const result = await HowItWorks.find();
      return result;
};

const getActiveHowItWorksFromDB = async () => {
      const result = await HowItWorks.find({ isActive: true });
      return result;
};

const getHowItWorksById = async (id: string) => {
      const result = await HowItWorks.findById(id);
      if (!result) {
            throw new Error('How it works not found');
      }
      return result;
};

const deleteHowItWorksFromDB = async (id: string) => {
      const result = await HowItWorks.findByIdAndDelete(id);
      if (!result) {
            throw new Error('How it works not found');
      }
      return result;
};

export const HowItWorksService = {
      createHowItWorksToDB,
      updateHowItWorksToDB,
      getAllHowItWorksFromDB,
      getActiveHowItWorksFromDB,
      getHowItWorksById,
      deleteHowItWorksFromDB,
};
