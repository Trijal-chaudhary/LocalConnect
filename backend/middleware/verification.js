import { Resend } from "resend";

const resend = new Resend("re_E7gwemJ7_PsNKTK2DgmYdPXHAu1X9MsRQ");

const verification = async (email, otp) => {
  try {
    await resend.emails.send({
      from: "LocalConnect <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP - LocalConnect",
      html: `<h1>Your OTP: ${otp}</h1><p>Valid for 5 minutes</p>`,
    });

    console.log("OTP sent via Resend");
    return true;
  } catch (error) {
    console.error("Resend error:", error);
    return false;
  }
}


export default verification;