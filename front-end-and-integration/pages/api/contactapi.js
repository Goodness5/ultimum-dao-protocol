import nodemailer from "nodemailer";
 
export default async (req, res) => {
  const {email} = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
 
  try {
    await transporter.sendMail({
      from: "Ultimum Protocol",
      to: process.env.SMTP_TO,
      subject: "New newsletter subscriber notification from Ultimum Protocol",
      html: `<div style="color:#fff;background-color:#224;font-size:120%;box-shadow:2px 2px 2px 2px #ccf;padding:5%">
        <p style="font-size:130%;text-align:center;font-weight:bold;margin-bottom:3%;color:#802">SUBSCRIBER</p>
        <p>${email}</p>
        </div>
      `
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
  return res.status(200).json({ error: "" });
};