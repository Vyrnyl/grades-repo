/*
  Warnings:

  - You are about to drop the column `progrmCode` on the `specialization` table. All the data in the column will be lost.
  - Added the required column `programCode` to the `Specialization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `specialization` DROP COLUMN `progrmCode`,
    ADD COLUMN `programCode` VARCHAR(191) NOT NULL;
