/*
  Warnings:

  - You are about to drop the `Notificaton` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notificaton" DROP CONSTRAINT "Notificaton_notifiedId_fkey";

-- DropTable
DROP TABLE "Notificaton";

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "postTitle" TEXT NOT NULL,
    "informer" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "notifiedId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notifiedId_fkey" FOREIGN KEY ("notifiedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
