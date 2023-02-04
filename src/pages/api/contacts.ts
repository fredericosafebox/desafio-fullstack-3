import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/middlewares/verifyToken";
import getAllContactsController from "@/controllers/contacts/getAllContacts.controller";
import createContactContoller from "@/controllers/contacts/createContact.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await validateToken(req, res);

  switch (req.method) {
    case "GET":
      await getAllContactsController(req, res, user!);
      break;
    case "POST":
      await createContactContoller(req, res, user!);
      break;
    default:
      return res.status(405).send("");
  }
}
