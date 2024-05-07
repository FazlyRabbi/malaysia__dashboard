/*
  Warnings:

  - You are about to drop the `Oder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Oder";

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "price" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_phone_key" ON "Order"("phone");
