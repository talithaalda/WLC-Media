/*
  Warnings:

  - Added the required column `brand` to the `Porto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Porto" ADD COLUMN     "brand" TEXT NOT NULL;
