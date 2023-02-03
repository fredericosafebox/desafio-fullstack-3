import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "@/middlewares/verifyToken";
import { updatedContactSchema } from "@/schemas/contactSchema";
import { ValidationError } from "yup";
import verifyOwner from "@/middlewares/verifyOwner";
import { resolve } from "path/win32";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await validateToken(req, res);
  const targetId = Number(req.query.id);

  switch (req.method) {
    case "GET":
      try {
        const contact = await prisma.contact.findFirstOrThrow({
          select: {
            id: true,
            email: true,
            phone: true,
            fullName: true,
            createdAt: true,
            updatedAt: true,
          },
          //@ts-ignore
          where: { id: targetId, userId: user!.id },
        });
        return res.status(200).json(contact);
      } catch (error) {
        return res.status(401).json({
          message:
            "Referência inválida. Você tentou acessar um contato que não está na sua lista.",
        });
      }

    case "PATCH":
      try {
        await verifyOwner(user!, targetId, res);
        const newData = await updatedContactSchema
          .validate(req.body)
          .then((validated) => {
            return updatedContactSchema.cast(validated, { stripUnknown: true });
          });
        //@ts-ignore
        const updatedContact = await prisma.contact.update({
          data: newData,
          where: {
            id: targetId,
          },
        });
        return res.status(200).json(newData);
      } catch (error) {
        if (error instanceof ValidationError) {
          return res
            .status(400)
            .json({ status: 400, error: error.type, message: error.message });
        }
        return res.status(401).json(error);
      }

    case "DELETE":
      await verifyOwner(user!, targetId, res);
      const deleted = await prisma.contact.delete({
        where: {
          id: targetId,
        },
      });
      return res.status(204).send("");
    default:
      return res.status(405).send("");
  }
}
