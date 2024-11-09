/*
  Warnings:

  - Added the required column `course` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` ADD COLUMN `course` VARCHAR(191) NOT NULL;
