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
        message: "User Already Added!",
      };

      return new Response(JSON.stringify(responseData), {
        status: 200,
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
      status: 200,
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

export async function GetUserByPhone_cont(req) {
  try {
    const { phone } = await req.json();

    const exisitngUser = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (exisitngUser) {
      const responseData = {
        ok: true,
        message: "User Found!",
        data: exisitngUser,
      };

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Content-Type": "application/json",
        },
      });
    } else {
      const responseData = {
        ok: true,
        message: "User Not Found!",
      };

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Content-Type": "application/json",
        },
      });
    }
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

export async function UpdateUser_cont(req) {
  try {
    const { payload } = await req.json();

    const phone = payload.phone;

    const response = await prisma.User.update({
      where: {
        phone: phone,
      },
      data: {
        ...payload, // Updated data fields
      },
    });

    const responseData = {
      ok: true,
      message: "🎉অভিনন্দন, আপনার ব্যালেন্স সফলভাবে যোগ করা হয়েছে!",
      data: response,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
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
      message: "Failed to update order.",
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

export async function Login_cont(req) {
  try {
    const { phone, password } = await req.json();

    const exisitngUser = await prisma.user.findUnique({
      where: {
        phone,
      },
    });

    if (exisitngUser) {
      const match = await bcrypt.compare(password, exisitngUser.password);

      if (match) {
        const responseData = {
          ok: true,
          message: "Login Success!",
          data: exisitngUser,
        };

        return new Response(JSON.stringify(responseData), {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
          },
        });
      } else {
        const responseData = {
          ok: false,
          message: "Please provie right informations!",
        };

        return new Response(JSON.stringify(responseData), {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      const responseData = {
        ok: false,
        message: "Please provie right informations!",
      };

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Content-Type": "application/json",
        },
      });
    }
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
