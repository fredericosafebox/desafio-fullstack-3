import { NextApiResponse } from "next";
import { User } from "@prisma/client";

export default async function verifyOwner(
  user: User,
  id: number,
  res: NextApiResponse
) {
  const exists = await prisma.contact.findFirst({
    where: { id: id },
    include: { users: true },
  });
  if (!exists) {
    return res.status(401).json({
      message:
        "Referência inválida. Você tentou acessar um contato que não está na sua lista.",
    });
  }
  //@ts-ignore
  if (exists.userId !== user.id) {
    return res.status(401).json({
      message:
        "Referência inválida. Você tentou acessar um contato que não está na sua lista.",
    });
  }
}
