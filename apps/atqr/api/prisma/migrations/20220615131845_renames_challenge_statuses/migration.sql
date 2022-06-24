/*
  Warnings:

  - The values [ONGOING,COMPLETED,FAILED] on the enum `ChallengeStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChallengeStatus_new" AS ENUM ('Ongoing', 'Completed', 'Failed');
ALTER TABLE "Challenge" ALTER COLUMN "status" TYPE "ChallengeStatus_new" USING ("status"::text::"ChallengeStatus_new");
ALTER TYPE "ChallengeStatus" RENAME TO "ChallengeStatus_old";
ALTER TYPE "ChallengeStatus_new" RENAME TO "ChallengeStatus";
DROP TYPE "ChallengeStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "status",
ADD COLUMN     "status" "ChallengeStatus" NOT NULL DEFAULT E'Ongoing';
