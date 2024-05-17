import { createEdgeRouter } from "next-connect";

import {
  CreatePayment_cont,
  UpdatePayment_cont,
  DeletePayment_cont,
  GetPayments_cont,
} from "../../controllers/payment.cont";

const router = createEdgeRouter();

router
  .get(GetPayments_cont)
  .post(CreatePayment_cont)
  .put(UpdatePayment_cont)
  .patch(DeletePayment_cont);

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
