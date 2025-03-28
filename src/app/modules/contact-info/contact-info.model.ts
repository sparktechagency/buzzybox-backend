import mongoose, { Schema } from 'mongoose';
import { IContactInfo } from './contact-info.interface';

const contactInfoSchema = new Schema<IContactInfo>(
      {
            email: {
                  type: String,
                  required: true,
            },
            phone: {
                  type: String,
                  required: true,
            },
            location: {
                  type: String,
                  required: true,
            },
      },
      {
            timestamps: true,
      }
);

export const ContactInfo = mongoose.model<IContactInfo>('ContactInfo', contactInfoSchema);
