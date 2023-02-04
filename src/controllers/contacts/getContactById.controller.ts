import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import getContactByIdService from "@/services/contacts/getContactById.service";

export default async function getContactByIdController(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User,
  id: number
) {
  try {
    const contact = await getContactByIdService(user, id);
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(401).json({
      message:
        "Referência inválida. Você tentou acessar um contato que não está na sua lista.",
    });
  }
}
