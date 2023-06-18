/*
  Warnings:

  - You are about to drop the column `elenco` on the `movies` table. All the data in the column will be lost.
  - Added the required column `cast` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);
INSERT INTO "new_users" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT,
    "cast" TEXT NOT NULL,
    "streamer" TEXT NOT NULL
);
INSERT INTO "new_movies" ("description", "id", "streamer", "title") SELECT "description", "id", "streamer", "title" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
