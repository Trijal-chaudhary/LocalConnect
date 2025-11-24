import transporter from "./nodemailer.js";

const verification = async (email, content) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <harshvardhanchaudhary27@gmail.com>',
    to: "hirachaudhary846004@gmail.com",
    subject: "Hello ✔",
    text: "Hello harsh", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
  // info();
  console.log("Message sent:", info.messageId);
}


export default verification;