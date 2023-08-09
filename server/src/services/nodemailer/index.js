import nodemailer from "nodemailer";
import { logger } from "../../utils";
import { frontendURL } from "../../config";
export const sendEmail = async (emailBody) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    //Fake config for testing - use values from config
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // use nodeMailerHost from config
      port: 587, // use nodeMailerPort from config
      secure: false,
      auth: {
        user: testAccount.user, // generated fake ethereal user - use nodeMailerUser from config
        pass: testAccount.pass, // generated fake ethereal password -  use nodeMailerPassword from config
      },
    });
    const mailOptions = {
      from: 'Task Management" <taskmanagement@example.com>',
      to: emailBody.email,
      subject: "Task Management - Reset Password",
      text: `Click on the link to reset password : ${frontendURL}/${emailBody.resetPasswordToken} `,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info("Email sent: " + info.response);
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};
