import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateMinutePack_db = async (data) => {
  const response = await prisma.MinutePack.createMany({
    data: data,
  });
  return response;
};

export async function GetMinutePacks_db() {
  const records = await prisma.MinutePack.findMany({
    orderBy: {
      id: "asc", // 'asc' for ascending order, 'desc' for descending order
    },
  });
  return records;
}

export async function DeleteMinutePack_db(minutePackId) {
  const id = parseInt(minutePackId);
  const response = await prisma.MinutePack.delete({
    where: {
      id: id,
    },
  });
  return response;
}

export async function UpdateMinutePack_db(minutePackId, newData) {
  const id = parseInt(minutePackId);
  const response = await prisma.MinutePack.update({
    where: {
      id: id,
    },
    data: {
      ...newData, // Updated data fields
    },
  });
  return response;
}
