import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client

const createBoxer = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { 
        id, createdAt, updatedAt, isUser,
        firstName, lastName, nickname,
        birthday, hometown, isChampion,
        wins, losses, draws, ranking,
        attributes: {
            offensive: {
                agility, power, handSpeed, accuracy, aggression
            },
            defensive: {
                reflex, footwork, evasion, blocking, reaction
            },
            health: {
                conditioning, hp, recovery, chin, body,
                mental, awareness, fightIQ,
                dangerState,
                //calculate parameter for which the boxers attributes change ie
                // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
                desperationState,
                //same, some fighters are different, some are same
            }
        }
    } = req.body;

    const boxer = await prisma.boxer.create({
      data: {
        id, createdAt, updatedAt, isUser,
        firstName, lastName, nickname,
        birthday, hometown, isChampion,
        wins, losses, draws, ranking,
            agility, power, handSpeed, accuracy, aggression,
            reflex, footwork, evasion, blocking, reaction,
            conditioning, hp, recovery, chin, body,
            mental, awareness, fightIQ,
            dangerState,
            //calculate parameter for which the boxers attributes change ie
            // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
            desperationState,
            //same, some fighters are different, some are same
      },
    });
    res.status(200).json({
      status: "success",
      data: boxer,
    });
  });