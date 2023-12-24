// lib/db.js

import { PrismaClient } from "@prisma/client";
import sendEmail from "../lib/sendEmail";
import { date } from "yup";
const prisma = new PrismaClient();

export const createUser = async (name, email, password) => {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "admin",
    },
  });
};

export const getUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const hashPassword = async (password) => {
  const bcrypt = require("bcryptjs");
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function resetPasswordToken(userId) {
  const tokenLength = 20;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  await prisma.user.update({
    where: {
      id: parseInt(userId, 10),
    },
    data: {
      token,
      tokenExp: new Date(Date.now() + 3600000),
    },
  });
  return token;
}

export async function sendResetPasswordEmail(email, token) {
  // Your logic to send a reset password email to the user
  // This is a fictional example, replace it with your actual implementation
  const subject = "Reset Your Password";
  const body = `Click the following link to reset your password:http://localhost:3000/admin/reset-password?token=${token}`;
  await sendEmail(email, subject, body);
}
