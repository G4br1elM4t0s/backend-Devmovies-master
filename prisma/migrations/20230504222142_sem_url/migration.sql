/*
  Warnings:

  - You are about to drop the column `url` on the `movies` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "nameImg" TEXT NOT NULL,
    "size" INTEGER,
    "description" TEXT,
    "cast" TEXT NOT NULL,
    "streamer" TEXT NOT NULL
);
INSERT INTO "new_movies" ("cast", "description", "id", "nameImg", "size", "streamer", "thumbnail", "title") SELECT "cast", "description", "id", "nameImg", "size", "streamer", "thumbnail", "title" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
