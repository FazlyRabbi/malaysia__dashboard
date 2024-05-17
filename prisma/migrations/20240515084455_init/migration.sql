-- AlterTable
ALTER TABLE "User" ALTER COLUMN "token" SET DEFAULT '0';

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
