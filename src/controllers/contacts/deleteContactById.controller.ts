import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import verifyOwner from "@/middlewares/verifyOwner";
import deleteContactByIdService from "@/services/contacts/deleteContactById.service";

export default async function deleteContactByIdController(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User,
  id: number
) {
  await verifyOwner(user!, id, res);
  const deleted = await deleteContactByIdService(id);
  return res.status(204).send("");
}
