-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "nameImg" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "url" TEXT,
    "description" TEXT,
    "cast" TEXT NOT NULL,
    "streamer" TEXT NOT NULL
);
INSERT INTO "new_movies" ("cast", "description", "id", "nameImg", "size", "streamer", "thumbnail", "title", "url") SELECT "cast", "description", "id", "nameImg", "size", "streamer", "thumbnail", "title", "url" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
