import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const category = req.query.id;

  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      where: {
        category,
      },
      include: {
        comment: true,
        author: true,
      },
    });
    res.status(200).json(posts);
  }
};
