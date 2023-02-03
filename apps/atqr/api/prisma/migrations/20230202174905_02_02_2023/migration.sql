/*
  Warnings:

  - Added the required column `judge` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollmentId` to the `Officiation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judge` to the `Officiation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ParticipationRole" AS ENUM ('Contender', 'Judge');

-- DropIndex
DROP INDEX "Enrollment_id_key";

-- DropIndex
DROP INDEX "Officiation_id_key";

-- DropIndex
DROP INDEX "PaymentMethod_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "judge" "ParticipationRole" NOT NULL,
ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Officiation" ADD COLUMN     "enrollmentId" TEXT NOT NULL,
ADD COLUMN     "judge" "ParticipationRole" NOT NULL,
ADD CONSTRAINT "Officiation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
