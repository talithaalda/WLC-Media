/*
  Warnings:

  - Made the column `categoryId` on table `Talent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Talent" DROP CONSTRAINT "Talent_categoryId_fkey";

-- AlterTable
ALTER TABLE "Talent" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryTalent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
