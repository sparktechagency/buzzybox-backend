import { IContact, ICreateAccount, IResetPassword } from '../types/emailTamplate';

const createAccount = (values: ICreateAccount) => {
      const data = {
            to: values.email,
            subject: 'Verify your account',
            html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #000;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://res.cloudinary.com/ddhhyc6mr/image/upload/v1742293522/buzzy-box-logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
          <h2 style="color: #277E16; font-size: 24px; margin-bottom: 20px;">Hey! ${values.name}, Your Buzzybox Account Credentials</h2>
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
        </div>
    </div>
</body>`,
      };
      return data;
};
const resetOtp = (values: IResetPassword) => {
      const data = {
            to: values.email,
            subject: 'Here is your email resend otp',
            html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #000;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://res.cloudinary.com/ddhhyc6mr/image/upload/v1742293522/buzzy-box-logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
          <h2 style="color: #277E16; font-size: 24px; margin-bottom: 20px;">Hey! ${values.email}, Your Buzzybox Account Credentials</h2>
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
        </div>
    </div>
</body>`,
      };
      return data;
};

const resetPassword = (values: IResetPassword) => {
      const data = {
            to: values.email,
            subject: 'Reset your password',
            html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <img src="https://res.cloudinary.com/ddhhyc6mr/image/upload/v1742293522/buzzy-box-logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
        <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #277E16; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
        </div>
    </div>
</body>`,
      };
      return data;
};
const contact = (values: IContact) => {
      const data = {
            to: values.email,
            subject: 'We’ve Received Your Message – Thank You!',
            html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">      
          <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <img src="https://res.cloudinary.com/ddhhyc6mr/image/upload/v1742293522/buzzy-box-logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width:150px" />
              <h2 style="color: #277E16; font-size: 24px; margin-bottom: 20px; text-align: center;">Thank You for Contacting Us, ${values.name}!</h2>
              
              <p style="color: #555; font-size: 16px; line-height: 1.5; text-align: center;">
                  We have received your message and our team will get back to you as soon as possible.
              </p>
              
              <div style="padding: 15px; background-color: #f4f4f4; border-radius: 8px; margin: 20px 0;">
                  <p style="color: #333; font-size: 16px; font-weight: bold;">Your Message Details:</p>
                  <p><strong>Name:</strong> ${values.name}</p>
                  <p><strong>Email:</strong> ${values.email}</p>
                  <p><strong>Subject:</strong> ${values.subject}</p>
                  <p><strong>Message:</strong> ${values.message}</p>
              </div>
  
              <p style="color: #555; font-size: 14px; text-align: center;">
                  If your inquiry is urgent, feel free to reach out to us directly at 
                  <a href="mailto:support@yourdomain.com" style="color: #277E16; text-decoration: none;">support@yourdomain.com</a>.
              </p>
  
              <p style="color: #555; font-size: 14px; text-align: center; margin-top: 20px;">
                  Best Regards, <br/>
                  The [Your Company Name] Team
              </p>
          </div>
      </body>`,
      };
      return data;
};

const invite = (values: { email: string; name: string; message: string; link: string }) => {
      const data = {
            to: values.email,
            subject: "You've been invited to BuzzyBox!",
            html: `<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #000;">
        <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <img src="https://res.cloudinary.com/ddhhyc6mr/image/upload/v1742293522/buzzy-box-logo.png" alt="Logo" style="display: block; margin: 0 auto 20px; width: 150px;" />
          <h2 style="color: #000; font-size: 24px; margin-bottom: 20px;">Hey there,</h2>
          <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">You’ve been invited by <strong>BuzzyBox</strong> to add a message to <strong>${values.email}</strong> BuzzyBox.</p>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">A BuzzyBox is a digital card created by lots of lovely people for one lucky person. Make your message stand out by adding photos and GIFs too!</p>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">BuzzyBox has included a personal message below:</p>
            <div style="background-color: #f1f1f1; width: 80%; max-width: 400px; padding: 12px 20px; text-align: center; border-radius: 8px; font-size: 16px; margin: 20px auto; color: #333;">${values.message}</div>
            <a href="${values.link}" style="display: inline-block; background-color: #00c853; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Add your message</a>
          </div>
          <p style="color: #555; font-size: 16px; line-height: 1.5; margin-top: 20px; text-align: center;">Once your BuzzyBox is ready, we will send it to them, and you’ll know you’ve contributed to making their day a little brighter! 🌟</p>
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #777; font-size: 14px;">Thanks!<br>Your friends at BuzzyBox</p>
          </div>
        </div>
      </body>`,
      };
      return data;
};

const sendGiftCardEmail = (values: { email: string; name: string; giftCardUrl: string; message?: string }) => {
      const data = {
            to: values.email,
            subject: '🎁 Your Special Gift Card from BuzzyBox!',
            html: `
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4; width: 100%; padding: 0;">
          <table width="100%" bgcolor="#f4f4f4" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="100%" max-width="800px" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="border-radius: 12px; box-shadow: 0px 4px 15px rgba(0,0,0,0.1); padding: 40px; text-align: center;">
                
                  <!-- Logo -->
                  <tr>
                    <td align="center">
                      <img src="https://res.cloudinary.com/ddhhyc6mr/image/upload/v1742293522/buzzy-box-logo.png" alt="BuzzyBox Logo" width="150" style="margin-bottom: 20px;">
                    </td>
                  </tr>
    
                  <!-- Greeting -->
                  <tr>
                    <td align="center" style="font-size: 28px; font-weight: bold; color: #333; margin-bottom: 20px;">
                      🎉 Surprise, ${values.name}! 🎉
                    </td>
                  </tr>
    
                  <!-- Message Introduction -->
                  <tr>
                    <td align="center" style="font-size: 18px; color: #555; line-height: 1.6; padding: 0 20px;">
                      You have received a special <strong>gift card</strong> from <strong>BuzzyBox</strong>! 
                      Click the button below to view and redeem your gift.
                    </td>
                  </tr>
    
                  <!-- Personal Message (Conditional) -->
                  ${
                        values.message
                              ? `
                    <tr>
                      <td align="center" style="background-color: #f1f1f1; padding: 20px; border-radius: 8px; font-size: 16px; color: #333; margin-top: 30px; width: 80%; max-width: 700px;">
                        <em style="font-style: italic;">"${values.message}"</em>
                      </td>
                    </tr>
                  `
                              : ''
                  }
    
                  <!-- Button -->
                  <tr>
                    <td align="center" style="padding: 30px 0;">
                      <a href="${
                            values.giftCardUrl
                      }" style="background-color: #ff9800; color: #ffffff; font-size: 20px; font-weight: bold; padding: 14px 30px; text-decoration: none; border-radius: 8px; display: inline-block; transition: all 0.3s;">
                        🎁 View Your Gift Card
                      </a>
                    </td>
                  </tr>
    
                  <!-- Closing Message -->
                  <tr>
                    <td align="center" style="font-size: 18px; color: #555; line-height: 1.6; padding: 0 20px;">
                      We hope this gift makes your day extra special! ✨ Enjoy! 💖
                    </td>
                  </tr>
    
                  <!-- Footer -->
                  <tr>
                    <td align="center" style="font-size: 14px; color: #777; padding-top: 20px;">
                      <strong>Thanks!</strong><br>Your friends at <strong>BuzzyBox</strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      `,
      };

      return data;
};

export const emailTemplate = {
      createAccount,
      resetPassword,
      resetOtp,
      contact,
      invite,
      sendGiftCardEmail,
};
