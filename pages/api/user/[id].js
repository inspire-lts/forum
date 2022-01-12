import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const userId = req.query.id;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json(user);
  }
};
