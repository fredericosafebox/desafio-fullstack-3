import type { NextApiRequest, NextApiResponse } from "next";
import createUserService from "@/services/users/createUser.service";
import { createUserSchema } from "@/schemas/user.schema";
import verifyNewUserData from "@/middlewares/verifyPhone";
import { INewUser } from "@/interfaces/IUser";
import { ValidationError } from "yup";

export default async function createUserController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newUser = await createUserSchema
      .validate(req.body)
      .then(
        (data) => <INewUser>createUserSchema.cast(data, { stripUnknown: true })
      );
    await verifyNewUserData(newUser.phone, newUser.email, res);
    const createdUser = await createUserService(newUser);
    return res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(400)
        .json({ status: 400, error: error.name, message: error.message });
    }
  }
}
