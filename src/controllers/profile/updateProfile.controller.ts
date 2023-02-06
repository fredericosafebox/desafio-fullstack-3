import { NextApiRequest, NextApiResponse } from "next";
import updateProfileService from "@/services/profile/updateProfile.service";
import { User } from "@prisma/client";
import { updateProfileSchema } from "@/schemas/profileSchema";
import { ValidationError } from "yup";

export default async function updateProfileController(
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) {
  try {
    const data = await updateProfileSchema.validate(req.body).then((obj) => {
      return updateProfileSchema.cast(obj, { stripUnknown: true });
    });
    //@ts-ignore
    const result = await updateProfileService(data, user);
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(400)
        .json({ status: 400, error: error.type, message: error.message });
    }
    return res.status(500).json(error);
  }
}
