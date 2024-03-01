import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const CreateGroup_db = async (data) => {
//   const response = await prisma.Group.create({
//     data: data,
//   });
//   return response;
// };

export const CreateGroup_db = async (groupsData) => {
  try {
    const response = await prisma.group.createMany({
      data: groupsData,
    });
    return response;
  } catch (error) {
    // Handle errors, e.g., log them or throw them further
    console.error("Error creating groups:", error);
    throw error;
  }
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
