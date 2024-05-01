/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Record` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_recordId_fkey";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Record";

-- CreateTable
CREATE TABLE "DataPack" (
    "id" SERIAL NOT NULL,
    "oparetor" TEXT NOT NULL,
    "pack" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "todayPrice" TEXT NOT NULL,
    "officalPrice" TEXT NOT NULL,
    "validity" TEXT NOT NULL,

    CONSTRAINT "DataPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MinutePack" (
    "id" SERIAL NOT NULL,
    "oparetor" TEXT NOT NULL,
    "pack" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "todayPrice" TEXT NOT NULL,
    "officalPrice" TEXT NOT NULL,
    "validity" TEXT NOT NULL,

    CONSTRAINT "MinutePack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BundlePack" (
    "id" SERIAL NOT NULL,
    "oparetor" TEXT NOT NULL,
    "pack" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "todayPrice" TEXT NOT NULL,
    "officalPrice" TEXT NOT NULL,
    "validity" TEXT NOT NULL,

    CONSTRAINT "BundlePack_pkey" PRIMARY KEY ("id")
);
