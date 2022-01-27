import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      formData: { postId, postTitle, userInfo },
    } = req.body;

    console.log(postId, postTitle, userInfo);
    const result = await prisma.notification.create({
      data: {
        postId,
        postTitle,
        informer: userInfo.informer,
        image: userInfo.image,
        notified: { connect: { id: userInfo.id } },
      },
    });
    res.status(200).json(result);
  }
};
