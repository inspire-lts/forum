import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const email = req.query.id;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        notifications: true,
      },
    });
    res.status(200).json(user);
  }
};
