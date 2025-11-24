import transporter from "./nodemailer.js";

const verification = async (email, otp) => {
  const info = await transporter.sendMail({
    from: '"LocalConnect" <harshvardhanchaudhary27@gmail.com>',
    to: email,
    subject: "OTP",
    text: "Hello harsh", // plain‑text body
    html: `<b>OTP : ${otp}</b>`, // HTML body
  });
  // info();
  console.log("Message sent:", info.messageId);
}


export default verification;