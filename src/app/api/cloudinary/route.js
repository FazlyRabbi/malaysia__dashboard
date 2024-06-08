import { createEdgeRouter } from "next-connect";

import {
  UploadsToCloudinary,
  DelateBanner,
  GetData,
} from "../../controllers/Cloudinary.cont";

const router = createEdgeRouter();

router.post(UploadsToCloudinary).put(DelateBanner).patch(GetData);

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
