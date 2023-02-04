import { IContactUpdate } from "@/interfaces/IUser";
import { Contact } from "@prisma/client";

export default async function updateContactByIdService(
  data: IContactUpdate,
  id: number
): Promise<Contact> {
  const updatedContact = await prisma.contact.update({
    data,
    where: {
      id,
    },
  });
  return updatedContact;
}
