import { NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import schema from "@/schemas/tokenSchema";
import { ValidationError } from "yup";
import prisma from "@/lib";

interface IToken extends jwt.JwtPayload {
  id?: number;
  role?: string;
}

export async function validateToken(token: string, res: NextApiResponse) {
  try {
    const isValid = jwt.verify(token, "SECRET_KEY");
    if (!isValid) {
      return res.status(401).json({ status: 401, message: "Invalid token" });
    }
    //@ts-ignore
    const decoded: IToken = jwt.decode(token);
    const foundUser = await schema.validate(decoded).then((data) => {
      return prisma.user.findFirst({
        where: {
          id: data.id,
          role: data.role,
        },
      });
    });
    if (foundUser) {
      return foundUser;
    }
    return res.status(401).json({ status: 401, message: "Invalid token" });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(401)
        .json({ status: 401, error: error.type, message: error.message });
    }
    return res.status(401).json({ status: 401, message: error });
  }
}
