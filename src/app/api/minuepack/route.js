import { createEdgeRouter } from "next-connect";

import {
  CreateMinutePack_cont,
  GetMinutePacks_cont,
  DeleteMinutePack_cont,
  UpdateMinutePack_cont,
} from "../../controllers/minutePack.cont";

const router = createEdgeRouter();

router
  .get(GetMinutePacks_cont)
  .post(CreateMinutePack_cont)
  .put(UpdateMinutePack_cont)
  .patch(DeleteMinutePack_cont);

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
