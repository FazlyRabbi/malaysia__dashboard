import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateGroup_db = async (data) => {
  const response = await prisma.Group.create({
    data: data,
  });
  return response;
};

export async function GetGroup_db() {
  const records = await prisma.Group.findMany({
    include: { clients: true },
  });
  return records;
}

export async function DeleteGroup_db(clientId) {
  const id = parseInt(clientId);
  const response = await prisma.Group.delete({
    where: {
      id: id,
    },
  });

  return response;
}
