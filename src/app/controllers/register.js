import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function Register_cont(req) {


  try {
    const { name, phone, password } = await req.json();
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const exisitngUser = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (exisitngUser) {
      const responseData = {
        ok: true,
        message: "Phone already in use!",
      };

      return new Response(JSON.stringify(responseData), {
        status: 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Content-Type": "application/json",
        },
      });
    }

    await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
      },
    });

    const responseData = {
      ok: true,
      message: "User created!",
    };

    return new Response(JSON.stringify(responseData), {
      status: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    const responseData = {
      ok: false,
      message: "Internal Server Error!",
      data: err.message,
    };
    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
    });
  }
}
