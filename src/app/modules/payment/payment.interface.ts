import { ObjectId } from 'mongoose';

type IContributor = {
      email: string;
};
export type IPayment = {
      // userId: ObjectId;
      giftCardId: ObjectId;
      transactionId: string;
      status: 'pending' | 'success' | 'failed';
      amount: number;
      contributors: IContributor[];
      totalContribution: number;
      hasWithdrawn: boolean;
      claimToken?: string;
      stripeConnectAccountId?: string;
};
