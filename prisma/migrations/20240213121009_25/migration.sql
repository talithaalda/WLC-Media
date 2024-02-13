/*
  Warnings:

  - You are about to drop the `CategoryTalent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Talent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Talent" DROP CONSTRAINT "Talent_categoryId_fkey";

-- AlterTable
ALTER TABLE "Talent" ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoryTalent";
