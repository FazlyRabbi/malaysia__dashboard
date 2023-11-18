import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function createUser(data) {

  const user = await prisma.User.create({
    data: {
      name: data.name,
      password: await bcrypt.hash(data.password, 10),
      email: data.email,
      role: data.role,
    },
  });

  const { password, ...result } = user;
  return result;
}
