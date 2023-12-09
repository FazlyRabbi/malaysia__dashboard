import { createEdgeRouter } from "next-connect";

import {
  CreateClient_cont,
  GetClient_cont,
  UpdateClient_cont,
  DeleteClient_cont,
} from "../../controllers/Client.cont";

const router = createEdgeRouter();

router
  .get(GetClient_cont)
  .post(CreateClient_cont)
  .put(DeleteClient_cont)
  .patch(UpdateClient_cont);

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
