import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateOrder_db = async (data) => {
  const response = await prisma.Order.createMany({
    data: data,
  });
  return response;
};

export async function GetOrders_db() {
  const records = await prisma.Order.findMany({
    orderBy: {
      id: "asc", // 'asc' for ascending order, 'desc' for descending order
    },
  });
  return records;
}

export async function DeleteOrder_db(orderId) {
  const id = parseInt(orderId);
  const response = await prisma.Order.delete({
    where: {
      id: id,
    },
  });
  return response;
}

export async function UpdateOrder_db(orderId, newData) {
  const id = parseInt(orderId);

  const response = await prisma.Order.update({
    where: {
      id: id,
    },
    data: {
      ...newData, // Updated data fields
    },
  });
  return response;
}
