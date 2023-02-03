import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib";
import { validateToken } from "@/middlewares/verifyToken";
import { profileSchema, updateProfileSchema } from "@/schemas/profileSchema";
import { ValidationError } from "yup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1]!;
  const user = await validateToken(token, res);

  switch (req.method) {
    case "GET":
      const result = profileSchema.cast(user, { stripUnknown: true });
      return res.status(200).json(result);
    case "POST":
      return res.status(405).send("");
    case "PATCH":
      try {
        const data = await updateProfileSchema
          .validate(req.body)
          .then((obj) => {
            return updateProfileSchema.cast(obj, { stripUnknown: true });
          });
        const updatedUser = await prisma.user.update({
          where: { id: user!.id },
          data,
        });
        return res.status(200).send({ message: "user updated" });
      } catch (error) {
        if (error instanceof ValidationError) {
          return res
            .status(400)
            .json({ status: 400, error: error.type, message: error.message });
        }
        return res.status(500).json(error);
      }

    case "DELETE":
      const deleted = await prisma.user.delete({ where: { id: user!.id } });
      return res.status(204).json({ message: "user deleted" });
    default:
      return;
  }
}
