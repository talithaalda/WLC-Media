/*
  Warnings:

  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenExp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "tokenExp" TIMESTAMP(3) NOT NULL;
