/*
  Warnings:

  - Made the column `categoryId` on table `Porto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Talent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Porto" DROP CONSTRAINT "Porto_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Talent" DROP CONSTRAINT "Talent_categoryId_fkey";

-- AlterTable
ALTER TABLE "Porto" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Talent" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Porto" ADD CONSTRAINT "Porto_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryPorto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryTalent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
