import { User } from "@prisma/client";
import { Contact } from "@prisma/client";

export default async function getAllContactsService(
  user: User
): Promise<Contact[]> {
  const contacts = await prisma.contact.findMany({
    where: {
      //@ts-ignore
      userId: {
        equals: user!.id,
      },
    },
  });
  return contacts;
}
