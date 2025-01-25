/*
  Warnings:

  - You are about to drop the `assignedprogramyear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `assignedprogramyear` DROP FOREIGN KEY `AssignedProgramYear_userId_fkey`;

-- DropTable
DROP TABLE `assignedprogramyear`;

-- CreateTable
CREATE TABLE `AssignedProgramYearBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `programYearBlock` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssignedProgramYearBlock` ADD CONSTRAINT `AssignedProgramYearBlock_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
