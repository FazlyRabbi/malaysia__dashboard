import { createEdgeRouter } from "next-connect";

import {
  CreateOtp_cont,
  DeleteOtp_cont,
  UpdateOtp_cont,
} from "../../controllers/Otp.cont";

const router = createEdgeRouter();

router.post(CreateOtp_cont).put(DeleteOtp_cont).patch(UpdateOtp_cont);

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
