import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreatePayment_db = async (data) => {
  const response = await prisma.Payment.createMany({
    data: data,
  });
  return response;
};

export async function GetPayments_db() {
  const records = await prisma.Payment.findMany({
    orderBy: {
      id: "asc", // 'asc' for ascending order, 'desc' for descending order
    },
  });
  return records;
}

export async function DeletePayment_db(paymentId) {
  const id = parseInt(paymentId);
  const response = await prisma.Payment.delete({
    where: {
      id: id,
    },
  });
  return response;
}

export async function UpdatePayment_db(paymentId, newData) {
  const id = parseInt(paymentId);
  const response = await prisma.Payment.update({
    where: {
      id: id,
    },
    data: {
      ...newData, // Updated data fields
    },
  });
  return response;
}
