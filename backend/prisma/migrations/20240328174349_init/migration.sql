/*
  Warnings:

  - Changed the type of `date_of_purchase` on the `Vechile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Vechile" DROP COLUMN "date_of_purchase",
ADD COLUMN     "date_of_purchase" TIMESTAMP(3) NOT NULL;
