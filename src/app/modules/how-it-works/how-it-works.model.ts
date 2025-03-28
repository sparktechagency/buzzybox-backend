import { Schema, model } from 'mongoose';
import { IHowItWorks } from './how-it-works.interface';

const howItWorksSchema = new Schema<IHowItWorks>(
      {
            title: {
                  type: String,
                  required: true,
            },
            description: {
                  type: String,
                  required: true,
            },
            howItWorksImage: {
                  type: String,
                  required: true,
            },
      },
      {
            timestamps: true,
      }
);

export const HowItWorks = model<IHowItWorks>('HowItWorks', howItWorksSchema);
