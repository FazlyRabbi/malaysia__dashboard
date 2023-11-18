import { createEdgeRouter } from "next-connect";
import {
  GetGroup_cont,
  CreateGroup_cont,
  DeleteGroup_cont,
} from "../../controllers/Group.cont";

const router = createEdgeRouter();

router.get(GetGroup_cont).post(CreateGroup_cont).put(DeleteGroup_cont);

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
