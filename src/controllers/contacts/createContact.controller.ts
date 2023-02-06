import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { newContactSchema } from "@/schemas/contactSchema";
import { ValidationError } from "yup";
import createContactService from "@/services/contacts/createContact.service";

export default async function createContactContoller(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  try {
    const { email, fullName, phone } = await newContactSchema
      .validate(req.body)
      .then((data) => {
        return newContactSchema.cast(data, { stripUnknown: true });
      });
    const contactExists = await prisma.contact.findFirst({
      where: {
        phone: phone,
        //@ts-ignore
        userId: {
          equals: user!.id,
        },
      },
    });
    if (contactExists) {
      return res
        .status(400)
        .json({ status: 400, message: "Este contato já está em sua lista" });
    }
    const createdContact = await createContactService(
      email!,
      fullName!,
      phone!,
      user
    );
    return res.status(201).json(createdContact);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(400)
        .json({ status: 400, error: error.type, message: error.message });
    }
    return res.status(500).json(error);
  }
}
