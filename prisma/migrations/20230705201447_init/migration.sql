-- CreateTable
CREATE TABLE "Wish" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "imageUrl" TEXT,
    "giver" TEXT,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);
