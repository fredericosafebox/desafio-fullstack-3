import { NextApiRequest, NextApiResponse } from "next";
import loginController from "@/controllers/login.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const result = await loginController(req, res);
      break;
    default:
      return res.status(405).send("");
  }
}
