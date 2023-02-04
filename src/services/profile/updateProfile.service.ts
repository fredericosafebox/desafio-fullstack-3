import { User } from "@prisma/client";
import { IUpdateUser, IProfile } from "../../interfaces/IUser";
import { profileSchema } from "@/schemas/profileSchema";
import * as bcrypt from "bcrypt";

export default async function updateProfileService(
  data: IUpdateUser,
  user: User
): Promise<IProfile> {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const updatedUser = await prisma.user.update({
    where: { id: user!.id },
    //@ts-ignore
    data: { ...data },
  });
  return profileSchema.cast(updatedUser, { stripUnknown: true });
}
