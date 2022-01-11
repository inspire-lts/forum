import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async (req, res) => {
  const session = await getSession({ req });
  const postId = req.query.id;

  if (req.method === "POST") {
    const { replay } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content: replay,
        author: { connect: { email: session.user.email } },
        post: { connect: { id: postId } },
      },
    });
    res.status(200).json(comment);
  }

  if (req.method === "GET") {
    const comment = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json(comment);
  }
};
