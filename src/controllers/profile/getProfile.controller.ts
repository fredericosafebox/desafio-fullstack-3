import { NextApiRequest, NextApiResponse } from "next";
import getProfileService from "@/services/profile/getProfile.service";
import { User } from "@prisma/client";

export default async function getProfileController(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  const profile = await getProfileService(user);
  return res.status(200).json(profile);
}
