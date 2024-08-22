-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_programId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `yearLevel` INTEGER NULL,
    MODIFY `programId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
