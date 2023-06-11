/*
  Warnings:

  - You are about to drop the column `dangerState` on the `Boxer` table. All the data in the column will be lost.
  - You are about to drop the column `desperationState` on the `Boxer` table. All the data in the column will be lost.
  - You are about to drop the column `fightIQ` on the `Boxer` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Boxer` table. All the data in the column will be lost.
  - You are about to drop the column `handSpeed` on the `Boxer` table. All the data in the column will be lost.
  - You are about to drop the column `isChampion` on the `Boxer` table. All the data in the column will be lost.
  - You are about to drop the column `isUser` on the `Boxer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Boxer` table. All the data in the column will be lost.
  - Added the required column `danger_state` to the `Boxer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desperation_state` to the `Boxer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fight_iq` to the `Boxer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Boxer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hand_speed` to the `Boxer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_champion` to the `Boxer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_user` to the `Boxer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Boxer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boxer" DROP COLUMN "dangerState",
DROP COLUMN "desperationState",
DROP COLUMN "fightIQ",
DROP COLUMN "firstName",
DROP COLUMN "handSpeed",
DROP COLUMN "isChampion",
DROP COLUMN "isUser",
DROP COLUMN "lastName",
ADD COLUMN     "danger_state" INTEGER NOT NULL,
ADD COLUMN     "desperation_state" INTEGER NOT NULL,
ADD COLUMN     "fight_iq" INTEGER NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "hand_speed" INTEGER NOT NULL,
ADD COLUMN     "is_champion" BOOLEAN NOT NULL,
ADD COLUMN     "is_user" BOOLEAN NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;
