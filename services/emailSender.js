const nodemailer = require("nodemailer");

async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "Registered Successfully.",
    text: "Thank you for registerin",
    html: `<p>Thank you for registering</p>`,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;