/*
  Warnings:

  - Added the required column `nameImg` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "nameImg" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "description" TEXT,
    "cast" TEXT NOT NULL,
    "streamer" TEXT NOT NULL
);
INSERT INTO "new_movies" ("cast", "description", "id", "streamer", "thumbnail", "title") SELECT "cast", "description", "id", "streamer", "thumbnail", "title" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
