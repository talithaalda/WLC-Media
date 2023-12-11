-- CreateTable
CREATE TABLE "Talent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userIG" TEXT NOT NULL,
    "follIG" INTEGER NOT NULL,
    "ERIG" DOUBLE PRECISION NOT NULL,
    "startfromIG" INTEGER NOT NULL,
    "userTikTok" TEXT NOT NULL,
    "follTikTok" INTEGER NOT NULL,
    "ERTikTok" DOUBLE PRECISION NOT NULL,
    "startfromTikTok" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Talent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTalent" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "CategoryTalent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "linkMaps" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Talent" ADD CONSTRAINT "Talent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryTalent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
