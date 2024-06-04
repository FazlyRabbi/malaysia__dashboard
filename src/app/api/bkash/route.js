import { createEdgeRouter } from "next-connect";
import {
  GrantBkashToken_cont,
  CreatePayment_cont,
  ExecutePayment_cont,
} from "../../controllers/BkashPayment.cont";

const router = createEdgeRouter();

router
  .get(GrantBkashToken_cont)
  .post(CreatePayment_cont)
  .put(ExecutePayment_cont);

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
