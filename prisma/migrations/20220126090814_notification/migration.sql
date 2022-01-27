-- CreateTable
CREATE TABLE "Notificaton" (
    "id" TEXT NOT NULL,
    "postid" TEXT NOT NULL,
    "postTitle" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Notificaton_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notificaton" ADD CONSTRAINT "Notificaton_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
