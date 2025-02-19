/*
  Warnings:

  - You are about to drop the column `course` on the `class` table. All the data in the column will be lost.
  - Added the required column `courseTitle` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `class` DROP COLUMN `course`,
    ADD COLUMN `courseTitle` VARCHAR(191) NOT NULL;
