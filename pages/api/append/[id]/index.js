import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async (req, res) => {
  const session = await getSession({ req })
  const postId = req.query.id;

  if (req.method === "POST") {
    const { content } = req.body;
    const append = await prisma.append.create({
      data: {
        content,
        post: { connect: { id: postId } },
      },
    });
    res.status(200).json(append)
  }

  if (req.method === "GET") {
    const append = await prisma.append.findMany({
      where: {
        postId
      },
      orderBy: {
        createdAt: "asc"
      }
    })
    res.status(200).json(append)
  }
};
