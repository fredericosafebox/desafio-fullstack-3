import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib";
import { validateToken } from "@/middlewares/verifyToken";
import { ValidationError } from "yup";
import { newContactSchema } from "@/schemas/contactSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await validateToken(req, res);

  switch (req.method) {
    case "GET":
      const contacts = await prisma.contact.findMany({
        where: {
          //@ts-ignore
          userId: {
            equals: user!.id,
          },
        },
      });
      return res.status(200).json(contacts);
    case "POST":
      try {
        const { email, fullName, phone } = await newContactSchema
          .validate(req.body)
          .then((data) => {
            return newContactSchema.cast(data, { stripUnknown: true });
          });
        const createdContact = await prisma.contact.create({
          data: {
            email: email!,
            fullName: fullName!,
            phone: phone!,
            users: {
              connect: { id: user!.id },
            },
          },
        });
        return res.status(201).json(createdContact);
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
