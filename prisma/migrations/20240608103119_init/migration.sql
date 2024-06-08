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

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "token" TEXT DEFAULT '0',
    "role" TEXT NOT NULL DEFAULT 'client',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "offer" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "paymentID" TEXT,
    "payerReference" TEXT,
    "customerMsisdn" TEXT,
    "trxID" TEXT,
    "amount" TEXT,
    "statusMessage" TEXT,
    "paymentExecuteTime" TEXT,
    "merchantInvoiceNumber" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logo" (
    "id" SERIAL NOT NULL,
    "logo" TEXT,
    "type" TEXT DEFAULT 'logo',

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroBanners" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "type" TEXT DEFAULT 'hero',

    CONSTRAINT "HeroBanners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LowerBanners" (
    "id" SERIAL NOT NULL,
    "url" TEXT,

    CONSTRAINT "LowerBanners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
