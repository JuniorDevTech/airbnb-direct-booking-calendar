/*
  Warnings:

  - A unique constraint covering the columns `[externalId,propertyId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "externalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_externalId_propertyId_key" ON "Reservation"("externalId", "propertyId");
