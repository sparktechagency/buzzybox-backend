import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import { User } from '../user/user.model';

const sendInvite = async (id: string, inviteData: { email: string; name: string; message: string; link: string }) => {
      console.log('Searching for user with id:', id);
      const user = await User.findById(id);
      if (!user) {
            throw new Error('User not found');
      }
      const inviteEmail = emailTemplate.invite(inviteData);
      emailHelper.sendEmail(inviteEmail);
      return 'Invite sent successfully';
};

export const InviteService = {
      sendInvite,
};
