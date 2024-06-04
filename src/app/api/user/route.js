import { createEdgeRouter } from "next-connect";

import {
  GetUserByPhone_cont,
  UpdateUser_cont,
} from "../../controllers/register";

const router = createEdgeRouter();

router.patch(GetUserByPhone_cont).put(UpdateUser_cont);

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
