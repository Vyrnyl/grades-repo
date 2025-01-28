/*
  Warnings:

  - You are about to drop the column `programId` on the `addedcourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addedcourse` DROP COLUMN `programId`;

-- CreateTable
CREATE TABLE `ProgramIds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `programId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProgramIds` ADD CONSTRAINT `ProgramIds_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `AddedCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
