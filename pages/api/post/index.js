import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const session = await getSession({ req });

  if (req.method === "POST") {
    const {
      formData: { title, content, category },
    } = req.body;
    const result = await prisma.post.create({
      data: {
        title,
        content,
        category,
        author: { connect: { email: session.user.email } },
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "GET") {
    const result = await prisma.post.findMany({
      include: {
        author: true,
        comment: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(result);
  }
};
