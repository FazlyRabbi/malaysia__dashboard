/*
  Warnings:

  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `serviceName` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `AvailableSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlockedSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumber",
DROP COLUMN "serviceName",
DROP COLUMN "time",
ADD COLUMN     "country" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "groupId" INTEGER,
ADD COLUMN     "passport" TEXT,
ADD COLUMN     "recordId" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'proccesing',
ADD COLUMN     "visa" TEXT,
ALTER COLUMN "date" DROP NOT NULL;

-- DropTable
DROP TABLE "AvailableSlot";

-- DropTable
DROP TABLE "BlockedSlot";

-- DropTable
DROP TABLE "Contacts";

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;
