import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function CreateOtp_cont(req) {
  try {
    const { otp, id } = await req.json();

    if (otp) {
      const records = await prisma.otp.create({
        data: {
          otp: otp,
        },
      });

      const responseData = {
        ok: true,
        message: "Otp create Successfull!",
        data: records,
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
      const res = await prisma.otp.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      const responseData = {
        ok: true,
        message: "Otp retrieved successfully.",
        data: res,
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
      message: "Failed to create minute pack.",
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

export async function DeleteOtp_cont(req) {
  try {
    const { id } = await req.json();

    const response = await prisma.otp.delete({
      where: {
        id: parseInt(id),
      },
    });
    const responseData = {
      ok: true,
      message: "Otp deleted successfully.",
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
      message: "Failed to delete order.",
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

export async function UpdateOtp_cont(req) {
  try {
    const { id, otp } = await req.json();

    const response = await prisma.otp.update({
      where: {
        id: parseInt(id),
      },
      data: {
        otp,
      },
    });

    const responseData = {
      ok: true,
      message: "Otp updated successfully.",
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
