/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `title` on the `movies` table. All the data in the column will be lost.
  - Added the required column `name` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CategoryToMovie_B_index";

-- DropIndex
DROP INDEX "_CategoryToMovie_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Like";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToMovie";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "nameImg" TEXT NOT NULL,
    "size" INTEGER,
    "description" TEXT,
    "cast" TEXT NOT NULL
);
INSERT INTO "new_movies" ("cast", "description", "id", "nameImg", "size", "thumbnail") SELECT "cast", "description", "id", "nameImg", "size", "thumbnail" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
CREATE UNIQUE INDEX "movies_name_key" ON "movies"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
