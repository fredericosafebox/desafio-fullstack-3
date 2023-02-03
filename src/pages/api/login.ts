import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib";
import schema from "@/schemas/loginSchema";
import { ValidationError } from "yup";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const { email, password } = await schema
          .validate(req.body)
          .then((data) => {
            return schema.cast(data, { stripUnknown: true });
          });
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
          return res
            .status(400)
            .json({ status: 400, message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password!, user.password);
        if (isValidPassword) {
          const token = jwt.sign(
            { id: user.id, role: user.role },
            "SECRET_KEY",
            { expiresIn: "24h" }
          );
          return res.status(200).json({ token });
        }
        return res
          .status(400)
          .json({ status: 400, message: "Invalid email or password" });
      } catch (error) {
        if (error instanceof ValidationError) {
          return res
            .status(400)
            .json({ status: 400, error: error.type, message: error.message });
        }
        return res.status(500).json(error);
      }
    default:
      return res.status(405).send("");
  }
}
