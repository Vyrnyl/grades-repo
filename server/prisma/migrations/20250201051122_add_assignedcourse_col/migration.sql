/*
  Warnings:

  - Added the required column `yearLevel` to the `AssignedCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignedcourse` ADD COLUMN `yearLevel` INTEGER NOT NULL;
