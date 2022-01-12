/*
  Warnings:

  - You are about to drop the `_favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_userfollows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_favorites` DROP FOREIGN KEY `_favorites_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_favorites` DROP FOREIGN KEY `_favorites_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_userfollows` DROP FOREIGN KEY `_userfollows_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_userfollows` DROP FOREIGN KEY `_userfollows_ibfk_2`;

-- DropTable
DROP TABLE `_favorites`;

-- DropTable
DROP TABLE `_userfollows`;

-- DropTable
DROP TABLE `category`;
