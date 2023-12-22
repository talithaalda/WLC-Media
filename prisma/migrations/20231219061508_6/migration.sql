/*
  Warnings:

  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Porto" DROP CONSTRAINT "Porto_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Talent" DROP CONSTRAINT "Talent_categoryId_fkey";

-- AlterTable
ALTER TABLE "Porto" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Talent" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Porto" ADD CONSTRAINT "Porto_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryPorto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryTalent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
