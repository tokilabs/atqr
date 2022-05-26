/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('Ongoing', 'Completed', 'Failed');

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");
