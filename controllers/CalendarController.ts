import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma"; // prisma client

const getDay = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  const day = await prisma.calendar.findUnique({
    where: { id: id },
    select: { day: true }
  });

  res.status(200).json({
    status: "success",
    data: {
      day,
    },
  });
});

const progressDay = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;
  
    const currentCalendar = await prisma.calendar.update({
      where: { id: id },
      data: { day: { increment: 1 } }
    });
  
    res.status(200).json({
      status: "success",
      data: {
        currentCalendar,
      },
    });
  });


export { getDay, progressDay }