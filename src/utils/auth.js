// lib/db.js

import { PrismaClient } from "@prisma/client";

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

const hashPassword = async (password) => {
  const bcrypt = require("bcryptjs");
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
