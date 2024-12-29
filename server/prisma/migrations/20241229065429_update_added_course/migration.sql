-- DropForeignKey
ALTER TABLE `addedcourserecord` DROP FOREIGN KEY `AddedCourseRecord_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `AddedCourseRecord` ADD CONSTRAINT `AddedCourseRecord_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `AddedCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
