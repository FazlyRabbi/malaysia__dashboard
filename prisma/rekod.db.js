import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateRekod_db = async (data) => {
  const response = await prisma.Record.create({
    data: data,
  });
  return response;
};

export async function GetRekod_db() {
  const records = await prisma.Record.findMany({
    include: { clients: true },
  });
  return records;
}

export async function DeleteRekod_db(clientId) {
  const id = parseInt(clientId);
  const response = await prisma.Record.delete({
    where: {
      id: id,
    },
  });

  return response;
}
