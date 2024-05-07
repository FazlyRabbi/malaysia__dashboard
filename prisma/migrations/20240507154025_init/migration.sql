-- CreateTable
CREATE TABLE "Oder" (
    "id" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "price" TEXT NOT NULL,

    CONSTRAINT "Oder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Oder_phone_key" ON "Oder"("phone");
