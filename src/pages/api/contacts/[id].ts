import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/middlewares/verifyToken";
import getContactByIdController from "@/controllers/contacts/getContactById.controller";
import updateContactByIdController from "@/controllers/contacts/updateContactById.controller";
import deleteContactByIdController from "@/controllers/contacts/deleteContactById.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await validateToken(req, res);
  const targetId = Number(req.query.id);

  switch (req.method) {
    case "GET":
      await getContactByIdController(req, res, user!, targetId);
      break;
    case "PATCH":
      await updateContactByIdController(req, res, user!, targetId);
      break;
    case "DELETE":
      await deleteContactByIdController(req, res, user!, targetId);
      break;
    default:
      return res.status(405).send("");
  }
}
