import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import verifyOwner from "@/middlewares/verifyOwner";
import { User } from "@prisma/client";
import { updatedContactSchema } from "@/schemas/contactSchema";
import updateContactByIdService from "@/services/contacts/updateContactById.service";
import { readContactSchema } from "@/schemas/contactSchema";

export default async function updateContactByIdController(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User,
  id: number
) {
  try {
    await verifyOwner(user!, id, res);
    const newData = await updatedContactSchema
      .validate(req.body)
      .then((validated) => {
        return updatedContactSchema.cast(validated, { stripUnknown: true });
      });
    const result = await updateContactByIdService(newData, id).then((data) =>
      readContactSchema.cast(data, { stripUnknown: true })
    );
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(400)
        .json({ status: 400, error: error.type, message: error.message });
    }
    return res.status(401).json(error);
  }
}
