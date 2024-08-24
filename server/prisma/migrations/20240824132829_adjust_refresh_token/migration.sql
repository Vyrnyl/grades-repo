/*
  Warnings:

  - You are about to drop the column `userId` on the `refreshtoken` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- AlterTable
ALTER TABLE `refreshtoken` DROP COLUMN `userId`;
