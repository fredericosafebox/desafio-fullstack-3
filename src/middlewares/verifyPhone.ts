import prisma from "@/lib";
import { NextApiResponse } from "next";

async function validateNewUserData(
  phone: number,
  email: string,
  res: NextApiResponse
) {
  const numberExists = await prisma.user.findFirst({ where: { phone } });
  if (numberExists) {
    return res.status(400).json({ message: "Phone number already exists" });
  }
  const emailExists = await prisma.user.findFirst({ where: { email } });
  if (emailExists) {
    return res.status(400).json({ message: "Email already in use" });
  }
}

export default validateNewUserData;
