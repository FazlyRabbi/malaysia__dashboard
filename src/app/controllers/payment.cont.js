import {
    CreatePayment_db,
    GetPayments_db,
    UpdatePayment_db,
    DeletePayment_db,
  } from "../../../prisma/payment.db";
  
  export async function CreatePayment_cont(req) {
    try {
      const data = await req.json();
      const res = await CreatePayment_db(data);
      const responseData = {
        ok: true,
        message: "Payment created successfully.",
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
        message: "Failed to create payment.",
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
  
  export async function GetPayments_cont(req) {
    try {
      const res = await GetPayments_db();
  
      const responseData = {
        ok: true,
        message: "Payments retrieved successfully.",
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
        message: "Failed to retrieve payments.",
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
  
  export async function DeletePayment_cont(req) {
    try {
      const { id } = await req.json();
  
      const res = await DeletePayment_db(id);
  
      const responseData = {
        ok: true,
        message: "Payment deleted successfully.",
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
        message: "Failed to delete payment.",
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
  
  export async function UpdatePayment_cont(req) {
    try {
      const { payload } = await req.json();
  
      const res = await UpdatePayment_db(payload?.id, payload);
  
      const responseData = {
        ok: true,
        message: "Payment updated successfully.",
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
        message: "Failed to update payment.",
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
  