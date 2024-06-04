import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const CreateUser_db = async (data) => {
  const response = await prisma.User.createMany({
    data: data,
  });
  return response;
};

export async function GetUser_db(phone) {
  const records = await prisma.User.findOne({
    where: {
      phone: phone,
    },
  });

  return records;
}

// export async function users(data) {
//   const { email, password } = data;

//   const user = await prisma.User.findFirst({
//     where: {
//       email: data.email,
//     },
//   });

//   if (!user) {
//     return null;
//   }

//   // const com = await bcrypt.compare(password, user.password);

//   if (user) {
//     const { password, ...userWithOutPass } = user;
//     return data;
//   }
// }
