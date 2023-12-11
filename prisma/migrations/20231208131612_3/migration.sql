/*
  Warnings:

  - You are about to drop the column `category` on the `CategoryPorto` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `CategoryTalent` table. All the data in the column will be lost.
  - Added the required column `name` to the `CategoryPorto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CategoryTalent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryPorto" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CategoryTalent" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;
