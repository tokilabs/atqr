/*
  Warnings:

  - Changed the type of `price` on the `Challenge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
