-- CreateTable
CREATE TABLE "Wish" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "imageUrl" TEXT,
    "giver" TEXT,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wish_title_key" ON "Wish"("title");
