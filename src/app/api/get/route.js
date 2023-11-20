import { createEdgeRouter } from "next-connect";
import { getClientByVisa_cont, getClientByPassport_cont , GetGroup_cont} from "../../controllers/get.cont";
const router = createEdgeRouter();

router.post(getClientByVisa_cont).put(getClientByPassport_cont).patch(GetGroup_cont)

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
