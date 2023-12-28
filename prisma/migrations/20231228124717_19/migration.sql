/*
  Warnings:

  - Made the column `filename` on table `Porto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Porto" DROP CONSTRAINT "Porto_categoryId_fkey";

-- AlterTable
ALTER TABLE "Porto" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "filename" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Porto" ADD CONSTRAINT "Porto_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryPorto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
