import { Types } from 'mongoose';
interface IPage {
      image: string;
      message: string;
      senderName: string;
}

export interface IGiftCard {
      uniqueId: string;
      category: Types.ObjectId;
      image: string;
      price?: number;
      paymentIntentId?: string;
      receiverInfo?: {
            receiverEmail?: string;
            emailScheduleDate?: Date;
            message?: string;
            url?: string;
      };
      coverPage: {
            recipientName: string;
            title: string;
            senderName: string;
      };
      pages?: IPage[];
      status: 'pending' | 'sent' | 'failed';
      paymentStatus: 'pending' | 'paid' | 'failed';
}
