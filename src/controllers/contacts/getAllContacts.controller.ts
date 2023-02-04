import { NextApiRequest, NextApiResponse } from "next";
import getAllContactsService from "@/services/contacts/getAllContacts.service";
import { User } from "@prisma/client";

export default async function getAllContactsController(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  const contacts = await getAllContactsService(user);
  return res.status(200).json(contacts);
}
