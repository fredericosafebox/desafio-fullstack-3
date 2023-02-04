import { INewUser } from "@/interfaces/IUser";
import * as bcrypt from "bcrypt";
import { readUserSchema } from "@/schemas/user.schema";

export default async function createUserService(newUser: INewUser) {
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

  return createdUser;
}
