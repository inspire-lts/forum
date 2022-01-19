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

  if (req.method === "POST") {
    const {formData} = req.body
    console.log(formData, req.body)
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        ...formData
      }
    })
    res.status(200).json(user)
  }
};
