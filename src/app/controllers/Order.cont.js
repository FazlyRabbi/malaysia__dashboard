import {
  CreateOrder_db,
  GetOrders_db,
  UpdateOrder_db,
  DeleteOrder_db,
} from "../../../prisma/order.db";

export async function CreateOrder_cont(req) {
  try {
    const data = await req.json();
    const res = await CreateOrder_db(data);
    const responseData = {
      ok: true,
      message: "🎉অভিনন্দন! আপনার অফারটি সফলভাবে কেনা হয়েছে, অনুগ্রহ করে  একটু অপেক্ষা করুন।",
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

export async function GetOrders_cont(req) {
  try {
    const res = await GetOrders_db();

    const responseData = {
      ok: true,
      message: "Orders retrieved successfully.",
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
      message: "Failed to retrieve orders.",
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

export async function DeleteOrder_cont(req) {
  try {
    const { id } = await req.json();

    const res = await DeleteOrder_db(id);

    const responseData = {
      ok: true,
      message: "Order deleted successfully.",
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

export async function UpdateOrder_cont(req) {
  try {
    const { payload } = await req.json();

    const res = await UpdateOrder_db(payload?.id, payload);

    const responseData = {
      ok: true,
      message: "Order updated successfully.",
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
