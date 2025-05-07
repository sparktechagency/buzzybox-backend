import nodemailer from 'nodemailer';
import config from '../config';
import { errorLogger, logger } from '../shared/logger';
import { ISendEmail } from '../types/email';

const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: Number(config.email.port),
      secure: false,
      auth: {
            user: config.email.user,
            pass: config.email.pass,
      },
});

const sendEmail = async (values: ISendEmail) => {
      try {
            const info = await transporter.sendMail({
                  from: `"Buzzybox" ${config.email.from}`,
                  to: values.to,
                  subject: values.subject,
                  html: values.html,
            });

            logger.info('Mail sent successfully', { 
                  to: values.to, 
                  messageId: info.messageId,
                  accepted: info.accepted 
            });
            return { success: true, messageId: info.messageId };
      } catch (error) {
            errorLogger.error('Failed to send email', { 
                  to: values.to,
                  error: error instanceof Error ? error.message : 'Unknown error'
            });
            return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
      }
};

export const emailHelper = {
      sendEmail,
};
