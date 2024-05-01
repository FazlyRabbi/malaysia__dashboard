import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateBundlePack_db = async (data) => {
  const response = await prisma.BundlePack.createMany({
    data: data,
  });
  return response;
};

export async function GetBundlePacks_db() {
  const records = await prisma.BundlePack.findMany({
    orderBy: {
      id: "asc", // 'asc' for ascending order, 'desc' for descending order
    },
  });
  return records;
}

export async function DeleteBundlePack_db(bundlePackId) {
  const id = parseInt(bundlePackId);
  const response = await prisma.BundlePack.delete({
    where: {
      id: id,
    },
  });
  return response;
}

export async function UpdateBundlePack_db(bundlePackId, newData) {
  const id = parseInt(bundlePackId);
  const response = await prisma.BundlePack.update({
    where: {
      id: id,
    },
    data: {
      ...newData, // Updated data fields
    },
  });
  return response;
}
