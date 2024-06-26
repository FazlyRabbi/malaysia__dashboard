import { createEdgeRouter } from "next-connect";

import {
  Register_cont,
  Login_cont,
  GetUserByPhone_cont,
} from "../../controllers/register";

const router = createEdgeRouter();

router.post(Register_cont).patch(Login_cont).get(GetUserByPhone_cont);

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
