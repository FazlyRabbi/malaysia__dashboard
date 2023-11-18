import { createEdgeRouter } from "next-connect";
import {
  GetRekod_cont,
  CreateRekod_cont,
  DeleteRekod_cont,
} from "../../controllers/Rekod.cont";

const router = createEdgeRouter();

router.get(GetRekod_cont).post(CreateRekod_cont).put(DeleteRekod_cont);

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
