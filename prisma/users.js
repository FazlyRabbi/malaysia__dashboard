import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function users(data) {
  const { email, password } = data;

  const user = await prisma.User.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return null;
  }

  // const com = await bcrypt.compare(password, user.password);

  if (user) {
    const { password, ...userWithOutPass } = user;
    return data;
  }
}
