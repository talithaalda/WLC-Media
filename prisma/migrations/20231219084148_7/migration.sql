/*
  Warnings:

  - Added the required column `filename` to the `Porto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Porto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `Talent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Talent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Porto" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Talent" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
