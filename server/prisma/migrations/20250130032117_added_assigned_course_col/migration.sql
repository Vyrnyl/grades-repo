/*
  Warnings:

  - Added the required column `semester` to the `AssignedCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignedcourse` ADD COLUMN `semester` INTEGER NOT NULL;
