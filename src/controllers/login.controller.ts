import { NextApiRequest, NextApiResponse } from "next";
import schema from "@/schemas/loginSchema";
import { ValidationError } from "yup";
import loginService from "@/services/login.service";

export default async function loginController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = await schema.validate(req.body).then((data) => {
      return schema.cast(data, { stripUnknown: true });
    });
    const token = await loginService(res, email!, password!);
    if (!token) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid email or password" });
    }
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res
        .status(400)
        .json({ status: 400, error: error.type, message: error.message });
    }
    return res.status(500).json(error);
  }
}
