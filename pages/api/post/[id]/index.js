import { getSession } from "next-auth/react"
import prisma from "../../../../lib/prisma"

export default async (req, res) => {
  const session = await getSession({ req})
  const userId = req.query.id

  if (!session) {
    res.status(401).json({ unauthorized: true})
  }

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    res.status(200).json(user)
  }
}