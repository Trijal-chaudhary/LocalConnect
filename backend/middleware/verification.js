import transporter from "./nodemailer.js";

const verification = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: '"LocalConnect" <harshvardhanchaudhary27@gmail.com>',
      to: email,
      subject: "OTP - LocalConnect",
      text: `Your OTP is ${otp}`,
      html: `<b>OTP : ${otp}</b>`,

    });
    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("OTP EMAIL ERROR:", error);
    return false;
  }

  // info();
}


export default verification;