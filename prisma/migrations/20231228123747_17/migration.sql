-- DropForeignKey
ALTER TABLE "Talent" DROP CONSTRAINT "Talent_categoryId_fkey";

-- AlterTable
ALTER TABLE "Porto" ALTER COLUMN "filename" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Talent" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryTalent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
