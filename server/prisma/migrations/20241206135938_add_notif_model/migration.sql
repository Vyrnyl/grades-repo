/*
  Warnings:

  - Added the required column `userType` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notification` ADD COLUMN `userType` VARCHAR(191) NOT NULL;
