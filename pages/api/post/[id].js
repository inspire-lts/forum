import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const session = await getSession({ req });
  const postId = req.query.id;

  if (req.method === "GET") {
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        favoritedBy: true
      }
    });
    return res.status(200).json(post)
  }
};
