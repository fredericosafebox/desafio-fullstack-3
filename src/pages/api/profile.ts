import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: Number(req.query.id) },
      });
      return res.status(200).json(user);
    case "POST":
      return;
    case "PATCH":
      return;
    case "DELETE":
      return;
    default:
      return;
  }
}
