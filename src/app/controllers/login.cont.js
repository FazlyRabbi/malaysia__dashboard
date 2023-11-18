import { users } from "../../../prisma/users";

export async function login(req) {

  try {
    const data = await req.json();
    const result = await users(data);
    
    const responseData = {
      ok: true,
      message: "Login Successfully!",
      data: result,
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
      message: "Email or Password Incorrect!",
      data: err.message,
    };

    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json", // Set the content type header to JSON
      },
    });
  }
}
