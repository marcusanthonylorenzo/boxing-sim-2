/*
  Warnings:

  - Added the required column `calendar_id` to the `Boxer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boxer" ADD COLUMN     "calendar_id" INTEGER NOT NULL;
