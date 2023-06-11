-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boxer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "isUser" BOOLEAN NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT,
    "birthday" INTEGER NOT NULL,
    "hometown" TEXT NOT NULL,
    "isChampion" BOOLEAN NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "ranking" INTEGER,
    "agility" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,
    "handSpeed" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "aggression" INTEGER NOT NULL,
    "reflex" INTEGER NOT NULL,
    "footwork" INTEGER NOT NULL,
    "evasion" INTEGER NOT NULL,
    "blocking" INTEGER NOT NULL,
    "reaction" INTEGER NOT NULL,
    "conditioning" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "recovery" INTEGER NOT NULL,
    "chin" INTEGER NOT NULL,
    "body" INTEGER NOT NULL,
    "mental" INTEGER NOT NULL,
    "awareness" INTEGER NOT NULL,
    "fightIQ" INTEGER NOT NULL,
    "dangerState" INTEGER NOT NULL,
    "desperationState" INTEGER NOT NULL,

    CONSTRAINT "Boxer_pkey" PRIMARY KEY ("id")
);
