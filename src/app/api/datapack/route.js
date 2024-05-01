import { createEdgeRouter } from "next-connect";
import {CreateDataPack_cont, GetDataPack_cont, DeleteDataPack_cont, UpdateDataPack_cont} from "../../controllers/DataPack.cont"

const router = createEdgeRouter();

router
  .get(GetDataPack_cont)
  .post(CreateDataPack_cont)
  .put(UpdateDataPack_cont)
  .patch(DeleteDataPack_cont);

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
