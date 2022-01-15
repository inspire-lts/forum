import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const id = req.query.id;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        posts: {
          include: {
            author: true,
            comment: true,
          },
        },
        favorites: {
          include: {
            author: true,
            comment: true,
          },
        },
        followedBy: true,
        following: true,
      },
    });
    res.status(200).json(user);
  }
};
