import { NextApiRequest, NextApiResponse } from "next";
import getUsersService from "@/services/users/getUsers.service";

export default async function getUsersController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await getUsersService();
  return res.status(200).json(users);
}
