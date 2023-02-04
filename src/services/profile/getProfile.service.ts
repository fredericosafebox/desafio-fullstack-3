import { User } from "@prisma/client";
import { profileSchema } from "@/schemas/profileSchema";
import { IProfile } from "@/interfaces/IUser";

export default async function getProfileService(user: User): Promise<IProfile> {
  return profileSchema.cast(user, { stripUnknown: true });
}
