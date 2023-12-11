-- CreateTable
CREATE TABLE "Porto" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Porto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryPorto" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "CategoryPorto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Porto" ADD CONSTRAINT "Porto_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryPorto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
