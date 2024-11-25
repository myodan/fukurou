/*
  Warnings:

  - A unique constraint covering the columns `[webtoonId,episodeNumber]` on the table `episode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "episode_webtoonId_episodeNumber_key" ON "episode"("webtoonId", "episodeNumber");
