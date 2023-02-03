// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib";
import { createUserSchema, readUserSchema } from "@/schemas/user.schema";
import { ValidationError } from "yup";
import * as bcrypt from "bcrypt";
import { INewUser } from "@/interfaces/IUser";
import verifyNewUserData from "@/middlewares/verifyPhone";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const users = await prisma.user
        .findMany({
          where: { visibility: "VISIBLE" },
        })
        .then((data) =>
          data.map((user) => readUserSchema.cast(user, { stripUnknown: true }))
        );
      return res.status(200).json(users);

    case "POST":
      try {
        const newUser = await createUserSchema
          .validate(req.body)
          .then(
            (data) =>
              <INewUser>createUserSchema.cast(data, { stripUnknown: true })
          );
        await verifyNewUserData(newUser.phone, newUser.email, res);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        const createdUser = await prisma.user
          .create({ data: newUser })
          .then(async (user) => {
            if (user.email === "admin@admin.com") {
              await prisma.user.update({
                where: { id: user.id },
                data: { role: "ADMIN" },
              });
            }
            return readUserSchema.cast(user, {
              stripUnknown: true,
            });
          });

        return res.status(201).json(createdUser);
      } catch (error) {
        if (error instanceof ValidationError) {
          return res
            .status(400)
            .json({ status: 400, error: error.name, message: error.message });
        }
      }
    case "DELETE":
      const user = await prisma.user.deleteMany();
      return res.status(200).send("DELETE route");
    default:
      res.status(405).send("");
  }
}
