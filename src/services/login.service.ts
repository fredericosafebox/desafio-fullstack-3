import { NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import prisma from "@/lib";

export default async function loginService(
  res: NextApiResponse,
  email: string,
  password: string
): Promise<string | boolean> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return false;
  }
  const isValidPassword = await bcrypt.compare(password!, user.password);
  if (isValidPassword) {
    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", {
      expiresIn: "24h",
    });
    return token;
  }
  return false;
}
