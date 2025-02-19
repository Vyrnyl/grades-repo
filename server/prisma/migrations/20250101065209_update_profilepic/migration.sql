/*
  Warnings:

  - Added the required column `userId` to the `ProfilePic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profilepic` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProfilePic` ADD CONSTRAINT `ProfilePic_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
