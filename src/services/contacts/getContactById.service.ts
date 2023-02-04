import { User, Contact } from "@prisma/client";

export default async function getContactByIdService(
  user: User,
  id: number
): Promise<Contact> {
  const contact = await prisma.contact.findFirstOrThrow({
    select: {
      id: true,
      email: true,
      phone: true,
      fullName: true,
      createdAt: true,
      updatedAt: true,
    },
    //@ts-ignore
    where: { id, userId: user!.id },
  });
  return contact;
}
