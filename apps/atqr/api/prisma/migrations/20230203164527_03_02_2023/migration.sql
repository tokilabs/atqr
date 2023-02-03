/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `judge` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollmentId` to the `Officiation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judge` to the `Officiation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParticipationRole" AS ENUM ('Contender', 'Judge');

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "judge" "ParticipationRole" NOT NULL;

-- AlterTable
ALTER TABLE "Officiation" ADD COLUMN     "enrollmentId" TEXT NOT NULL,
ADD COLUMN     "judge" "ParticipationRole" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
