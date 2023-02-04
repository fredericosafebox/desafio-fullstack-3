// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import createUserController from "@/controllers/users/createUser.controller";
import { validateToken } from "@/middlewares/verifyToken";
import getUsersController from "@/controllers/users/getUsers.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const auth = await validateToken(req, res);
      await getUsersController(req, res);
      break;
    case "POST":
      const newUser = await createUserController(req, res);
      break;
    case "DELETE":
      const user = await prisma.user.deleteMany();
      return res.status(200).send("DELETE route");
    default:
      res.status(405).send("");
  }
}
