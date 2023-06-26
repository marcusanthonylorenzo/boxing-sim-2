import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client

const getAllBoxers = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const boxers = await prisma.boxer.findMany();

  return res.status(200).json({
    status: "success",
    data: {
      boxers,
    },
  });
});

const createBoxer = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { 
        id, created_at, updated_at, is_user, first_name, last_name, nickname,
        birthday, hometown, is_champion, calendar_id,
        wins, losses, draws, ranking,
        attributes: {
            offensive: {
                agility, power, hand_speed, accuracy, aggression
            },
            defensive: {
                reflex, footwork, evasion, blocking, reaction
            },
            health: {
                conditioning, hp, recovery, chin, body,
                mental, awareness, fight_iq,
                danger_state,
                //calculate parameter for which the boxers attributes change ie
                // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
                desperation_state,
                //same, some fighters are different, some are same
            }
        }
    } = req.body;

    const boxer = await prisma.boxer.create({
      data: {
        id, created_at, updated_at, is_user, first_name, last_name, nickname,
        birthday, hometown, is_champion, calendar_id,
        wins, losses, draws, ranking,
            agility, power, hand_speed, accuracy, aggression,
            reflex, footwork, evasion, blocking, reaction,
            conditioning, hp, recovery, chin, body,
            mental, awareness, fight_iq, danger_state,
            //calculate parameter for which the boxers attributes change ie
            // if (hp < 38% && mental < 50%) { updateBoxer(`power`, power*1.5) }
            desperation_state,
            //same, some fighters are different, some are same
      },
    });
    res.status(200).json({
      status: "success",
      data: boxer,
    });
  });

  const deleteBoxer = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    await prisma.boxer.delete({
      where: {
        id: id.toString(),
      },
    });

    console.log(` delete`, id )
  
    res.status(200).json({
      status: "success",
      data: null,
    });
  });

export { getAllBoxers, createBoxer, deleteBoxer }