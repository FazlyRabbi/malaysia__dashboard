import { GetGroup_db, CreateGroup_db, DeleteGroup_db } from "../../../prisma/group.db";
  
  export async function CreateGroup_cont(req) {
    try {
      const data = await req.json();
      const res = await CreateGroup_db(data);
      const responseData = {
        ok: true,
        message: "Group created successfully.",
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
          "Content-Type": "application/json", // Set the content type header to JSON
        },
      });
    }
  }
  
  export async function GetGroup_cont(req) {
    try {
      const res = await GetGroup_db();
  
      const responseData = {
        ok: true,
        message: "Group Get successfully.",
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
          "Content-Type": "application/json", // Set the content type header to JSON
        },
      });
    }
  }
  
  export async function DeleteGroup_cont(req) {
    try {
      const { id } = await req.json();
  
      const res = await DeleteGroup_db(id);
  
      const responseData = {
        ok: true,
        message: "client deleted successfully.",
        data: id,
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
        message: "Data Not Inserted!",
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
