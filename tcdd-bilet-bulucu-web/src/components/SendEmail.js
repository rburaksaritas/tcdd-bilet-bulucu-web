import React, { useState } from 'react';
import nodemailer from 'nodemailer';

const SendEmail = ({ tren_adi, binis_tarih, vagon_no, seat_no }) => {
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async () => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: 'your_email_address', // Replace with your email address
          pass: 'your_email_password', // Replace with your email password
        },
      });

      const mailOptions = {
        from: 'your_email_address', // Replace with your email address
        to: 'destination_email_address', // Replace with the destination email address
        subject: `Available Seat: ${seat_no}, Vagon ${vagon_no}, ${binis_tarih}`,
        text: `An available seat has been found on ${tren_adi} for the journey on ${binis_tarih}. Seat ${seat_no} in Wagon ${vagon_no} is available.`,
      };

      await transporter.sendMail(mailOptions);

      setEmailSent(true);
      console.log(`Email sent for Seat ${seat_no} in Wagon ${vagon_no} of ${tren_adi} on ${binis_tarih}.`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const sendTestEmail = () => {
    // This function can be called when a test email button is clicked.
    sendEmail();
  };

  return (
    <div>
      {/* Add a button to send a test email */}
      <button onClick={sendTestEmail}>Send Test Email</button>
      {emailSent && <p>Email sent successfully!</p>}
    </div>
  );
};

export default SendEmail;
