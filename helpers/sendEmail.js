require("dotenv").config();

const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
// const apiKey = `${process.env.SENDGRID_API_KEY}`;
// console.log("SendGrid key ", apiKey);
const sendEmail = async (data) => {
  const email = { ...data, from: " artem.sulimko@meta.ua" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
