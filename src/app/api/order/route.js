import { createEdgeRouter } from "next-connect";

import {
  CreateOrder_cont,
  UpdateOrder_cont,
  DeleteOrder_cont,
  GetOrders_cont,
} from "../../controllers/Order.cont";
const router = createEdgeRouter();

router
  .get(GetOrders_cont)
  .post(CreateOrder_cont)
  .put(UpdateOrder_cont)
  .patch(DeleteOrder_cont);

export async function GET(request, ctx) {
  return router.run(request, ctx);
}

export async function PUT(request, ctx) {
  return router.run(request, ctx);
}

export async function POST(request, ctx) {
  return router.run(request, ctx);
}

export async function PATCH(request, ctx) {
  return router.run(request, ctx);
}
