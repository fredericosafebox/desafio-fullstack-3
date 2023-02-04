import { User } from "@prisma/client";

export default async function deleteAccountService(user: User): Promise<void> {
  const deleted = await prisma.user.delete({ where: { id: user!.id } });
  return;
}
