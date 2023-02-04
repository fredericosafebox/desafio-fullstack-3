import { User, Contact } from "@prisma/client";

export default async function createContactService(
  email: string,
  fullName: string,
  phone: number,
  user: User
): Promise<Contact> {
  const createdContact = await prisma.contact.create({
    data: {
      email: email!,
      fullName: fullName!,
      phone: phone!,
      users: {
        connect: { id: user!.id },
      },
    },
  });

  return createdContact;
}
