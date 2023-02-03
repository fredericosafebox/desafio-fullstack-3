import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return;
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
