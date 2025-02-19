/*
  Warnings:

  - You are about to alter the column `token` on the `refreshtoken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2048)` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE `refreshtoken` MODIFY `token` VARCHAR(300) NOT NULL;
