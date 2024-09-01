/*
  Warnings:

  - You are about to alter the column `grade` on the `bsastudentrecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `grade` on the `bsbastudentrecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `grade` on the `bsmastudentrecord` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `bsastudentrecord` MODIFY `grade` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `bsbastudentrecord` MODIFY `grade` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `bsmastudentrecord` MODIFY `grade` DECIMAL(65, 30) NULL;
