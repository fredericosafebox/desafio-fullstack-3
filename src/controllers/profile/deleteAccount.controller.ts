import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import deleteAccountService from "@/services/profile/deleteAccount.service";

export default async function deleteAccountController(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  await deleteAccountService(user);
  return res.status(204).send("");
}
