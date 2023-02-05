import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/middlewares/verifyToken";
import getProfileController from "@/controllers/profile/getProfile.controller";
import deleteAccountController from "@/controllers/profile/deleteAccount.controller";
import updateProfileController from "@/controllers/profile/updateProfile.controller";
import prisma from "@/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await validateToken(req, res);

  switch (req.method) {
    case "GET":
      await getProfileController(req, res, user!);
      break;
    case "PATCH":
      await updateProfileController(req, res, user!);
      break;
    case "DELETE":
      await deleteAccountController(req, res, user!);
      break;
    default:
      return res.status(405).send("");
  }
}
