import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async (req, res) => {
  const session = await getSession({ req });
  const postId = req.query.id;

  if (req.method === "POST") {
    const { operation } = req.body;
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        favoritedBy: {
          [operation]: {
            email: session.user.email,
          },
        },
      },
    });
    return res.status(200).json(post);
  }
};
