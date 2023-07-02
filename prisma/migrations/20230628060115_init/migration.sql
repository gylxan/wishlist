-- CreateTable
CREATE TABLE "Wish" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "imageUrl" TEXT,
    "granter" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Wish_title_key" ON "Wish"("title");
