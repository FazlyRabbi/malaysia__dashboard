import {
    CreateMinutePack_db,
    GetMinutePacks_db,
    DeleteMinutePack_db,
    UpdateMinutePack_db
  } from "../../../prisma/minutePack.db";
  
  export async function CreateMinutePack_cont(req) {
    try {
      const data = await req.json();
      const res = await CreateMinutePack_db(data);
      const responseData = {
        ok: true,
        message: "Minute pack created successfully.",
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
  
  export async function GetMinutePacks_cont(req) {
    try {
      const res = await GetMinutePacks_db();
  
      const responseData = {
        ok: true,
        message: "Minute packs retrieved successfully.",
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
        message: "Failed to retrieve minute packs.",
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
  
  export async function DeleteMinutePack_cont(req) {
    try {
      const { id } = await req.json();
  
      const res = await DeleteMinutePack_db(id);
  
      const responseData = {
        ok: true,
        message: "Minute pack deleted successfully.",
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
        message: "Failed to delete minute pack.",
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
  
  export async function UpdateMinutePack_cont(req) {
    try {
      const {payload} = await req.json();
  
      const res = await UpdateMinutePack_db(payload?.id, payload);
  
      const responseData = {
        ok: true,
        message: "Minute pack updated successfully.",
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
        message: "Failed to update minute pack.",
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
  