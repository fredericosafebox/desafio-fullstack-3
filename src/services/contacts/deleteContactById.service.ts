export default async function deleteContactByIdService(
  id: number
): Promise<void> {
  const deleted = await prisma.contact.delete({
    where: {
      id,
    },
  });
}
