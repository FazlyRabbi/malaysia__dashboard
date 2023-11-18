import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateClient_db = async (data) => {
  const response = await prisma.Client.create({
    data: data,
  });
  return response;
};

export async function GetClient_db() {
  const records = await prisma.Client.findMany();
  return records;
}

export async function DeleteClient_db(clientId) {
  const id = parseInt(clientId);
  const response = await prisma.client.delete({
    where: {
      id: id,
    },
  });

  return response;
}

export async function UpdateClient_db(clientId, newData) {
  const id = parseInt(clientId);

  const response = await prisma.client.update({
    where: {
      id: id,
    },
    data: newData,
  });

  return response;
}
