import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';

const sendInvite = async (inviteData: { email: string; name: string; message: string; link: string }) => {
      const inviteEmail = emailTemplate.invite(inviteData);
      emailHelper.sendEmail(inviteEmail);
      return 'Invite sent successfully';
};

export const InviteService = {
      sendInvite,
};
