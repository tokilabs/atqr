-- CreateEnum
CREATE TYPE "ChallengeRepository" AS ENUM ('challenge', 'user');

-- CreateEnum
CREATE TYPE "ContenderOutcome" AS ENUM ('StillPlaying', 'Succeeded', 'Failed');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NotDueYet', 'Defaulted', 'Failed', 'Forgiven', 'Paid', 'Pending', 'Refunded', 'RefundRequested');

-- CreateEnum
CREATE TYPE "PaymentFundsStatus" AS ENUM ('NotDueYet', 'Defaulted', 'Failed', 'Forgiven', 'Paid', 'Pending', 'Refunded', 'RefundRequested');

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailConfirmed" BOOLEAN NOT NULL,
    "paymentMethodId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "pledge" INTEGER NOT NULL,
    "outcome" "ContenderOutcome" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentFundsStatus" "PaymentFundsStatus" NOT NULL,
    "challengeId" UUID NOT NULL,
    "paymentMethodId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Officiation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "outcome" "ContenderOutcome" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMethodId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_id_key" ON "Enrollment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Officiation_id_key" ON "Officiation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_id_key" ON "PaymentMethod"("id");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Officiation" ADD CONSTRAINT "Officiation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Officiation" ADD CONSTRAINT "Officiation_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
