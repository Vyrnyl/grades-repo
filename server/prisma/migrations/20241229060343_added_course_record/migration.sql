-- CreateTable
CREATE TABLE `AddedCourseRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `grade` DECIMAL(3, 1) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AddedCourseRecord` ADD CONSTRAINT `AddedCourseRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AddedCourseRecord` ADD CONSTRAINT `AddedCourseRecord_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `AddedCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
