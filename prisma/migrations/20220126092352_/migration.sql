/*
  Warnings:

  - You are about to drop the column `authorId` on the `Notificaton` table. All the data in the column will be lost.
  - Added the required column `image` to the `Notificaton` table without a default value. This is not possible if the table is not empty.
  - Added the required column `informer` to the `Notificaton` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notifiedId` to the `Notificaton` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notificaton" DROP CONSTRAINT "Notificaton_authorId_fkey";

-- AlterTable
ALTER TABLE "Notificaton" DROP COLUMN "authorId",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "informer" TEXT NOT NULL,
ADD COLUMN     "notifiedId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Notificaton" ADD CONSTRAINT "Notificaton_notifiedId_fkey" FOREIGN KEY ("notifiedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
