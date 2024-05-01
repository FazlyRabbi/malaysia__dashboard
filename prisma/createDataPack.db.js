import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateDataPack_db = async (data) => {
  const response = await prisma.DataPack.createMany({
    data: data,
  });
  return response;
};

export async function GetDataPack_db() {
  const records = await prisma.DataPack.findMany({
    // include: {
    //   group: {
    //     select: {
    //       name: true,
    //     },
    //   },
    //   record: {
    //     select: {
    //       content: true,
    //     },
    //   },
    // },
    orderBy: {
      id: "asc", // 'asc' for ascending order, 'desc' for descending order
    },
  });
  return records;
}

export async function DeleteDataPack_db(dataPackId) {

  const id = parseInt(dataPackId);

  const response = await prisma.DataPack.delete({
    where: {
      id: id,
    },
  });

  return response;
}

export async function UpdateDataPack_db(dataPackId, newData) {
  const id = parseInt(dataPackId);

  const response = await prisma.DataPack.update({
    where: {
      id: id,
    },
    data: {
      ...newData, // Existing data updates
      // groupId: newData.groupId, // Update group relation
      // recordId: newData.recordId, // Update record relation
    },
  });

  return response;
}
