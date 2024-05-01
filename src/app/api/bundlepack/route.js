import { createEdgeRouter } from "next-connect";
import {
  CreateBundlePack_cont,
  GetBundlePacks_cont,
  DeleteBundlePack_cont,
  UpdateBundlePack_cont
} from "../../controllers/bundlePack.cont.js";

const router = createEdgeRouter();

router
  .get(GetBundlePacks_cont)
  .post(CreateBundlePack_cont)
  .put(UpdateBundlePack_cont)
  .patch(DeleteBundlePack_cont);

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
