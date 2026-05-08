const nodemailer = require('nodemailer');

// Creating transporter object for sending emails
// using Gmail OAuth2 authentication
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verifying transporter configuration
// Checks whether email server is ready or not
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Generic function to send email
const sendEmail = async (to, subject, text, html) => {
  try {

    // Sending email using transporter
    const info = await transporter.sendMail({

      // Sender email address
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,

      // Receiver email address
      to,

      // Email subject
      subject,

      // Plain text version
      text,

      // HTML version of email
      html,
    });

    // Logging success message
    console.log('Message sent: %s', info.messageId);

    // Preview URL (works mainly for test accounts)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  } catch (error) {

    // Logging email sending errors
    console.error('Error sending email:', error);
  }
};

// Function to send welcome email after registration
async function sendRegistrationEmail(userEmail, name) {

    // Subject of email
    const subject = "Welcome to Backend Ledger"

    // Plain text email body
    const text = `Hi ${name},\n\nWelcome to Backend Ledger! We're excited to have you on board.\n\nBest regards,\nThe Backend Ledger Team`;

    // HTML email body
    const html = `<p>Hi ${name},</p>
                  <p>Welcome to Backend Ledger! We're excited to have you on board.</p>
                  <p>Best regards,<br>The Backend Ledger Team</p>`;

    // Calling reusable sendEmail function
    await sendEmail(userEmail, subject, text, html);
}

// Exporting function
module.exports = {
    sendRegistrationEmail
};