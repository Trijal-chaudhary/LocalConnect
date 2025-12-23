import { Resend } from "resend";
const api = "re_E7gwemJ7_PsNKTK2DgmYdPXHAu1X9MsRQ"
const resend = new Resend(process.env.api);

const verification = async (email, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP",
      html: `<h1>Your OTP: ${otp}</h1>`,
    });

    console.log("OTP sent via Resend");
    return true;
  } catch (error) {
    console.error("Resend error:", error);
    return false;
  }
};

export default verification;
