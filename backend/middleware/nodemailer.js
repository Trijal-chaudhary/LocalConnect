// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";


// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'harshvardhanchaudhary27@gmail.com',
    pass: 'ktezjjjrdnoucemj'
  },
});


export default transporter;