import { readUserSchema } from "@/schemas/user.schema";

export default async function getUsersService() {
  const users = await prisma.user
    .findMany({
      where: { visibility: "VISIBLE" },
    })
    .then((data) =>
      data.map((user) => readUserSchema.cast(user, { stripUnknown: true }))
    );
  return users;
}
