import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GetClientByVisa_db(num) {
  const records = await prisma.Client.findFirst({
    where: {
      visa: num,
    },

    include: {
      group: true, // Include the related group
      record: true, // Include the related record
    },
  });
  return records;
}

export async function GetClientByPassport_db(num) {
  const records = await prisma.Client.findFirst({
    where: {
      passport: num,
    },
    include: {
      group: true, // Include the related group
      record: true, // Include the related record
    },
  });
  return records;
}

export async function GetGroup_db(name) {
  const records = await prisma.Group.findFirst({
    where: {
      name: name,
    },
    include: {
      clients: true, // Include the related group
    },
  });

  return records;
}
