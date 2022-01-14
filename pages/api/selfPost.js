import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ unauthorized: true });
  }

  if (req.method === "GET") {
    const user = await prisma.user.findMany({
      where: {
        email: session.user.email,
      },
    });
    const result = await prisma.post.findMany({
      where: {
        authorId: user[0].id,
      },
      include: {
        author: true,
        comment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(result);
  }
};
