/*
  Warnings:

  - You are about to alter the column `grade` on the `bsastudentrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(3,1)`.
  - You are about to alter the column `grade` on the `bsbastudentrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(3,1)`.
  - You are about to alter the column `grade` on the `bsmastudentrecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(3,1)`.

*/
-- AlterTable
ALTER TABLE `bsastudentrecord` MODIFY `grade` DECIMAL(3, 1) NULL;

-- AlterTable
ALTER TABLE `bsbastudentrecord` MODIFY `grade` DECIMAL(3, 1) NULL;

-- AlterTable
ALTER TABLE `bsmastudentrecord` MODIFY `grade` DECIMAL(3, 1) NULL;
