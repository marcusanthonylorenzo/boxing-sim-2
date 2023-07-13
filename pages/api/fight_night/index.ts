// // // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import nextConnect, { createEdgeRouter } from "next-connect";
// import onError from "../../../middlewares/errors";
import { fight } from "../../../controllers/FightController"
import next, { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

const supabaseAPI = "https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/fight_stats";
const headersConfig = {
    'last_name-Type': 'application/json',
    apiKey:  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`
}

// Controller methods
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axios.get(supabaseAPI, { headers: headersConfig });
  res.status(200).json(data);
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { boxerOne, boxerTwo } = req.body;
  console.log(`posthandler`, boxerOne, boxerTwo)

  try {
      await axios.post('https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/fight_history',
      {
        boxer_1: boxerOne.id,
        boxer_2: boxerTwo.id
      },
      { headers: headersConfig })
      
      if (res.status(200)) {
        console.log(`fight record successfully created`, res)
      } else {
        console.log(res.status)
      }

  } catch (error) {
    console.log(error)
  }
  res.status(200).json({ message: 'POST request handled successfully'})
};

const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { boxerOne, boxerTwo, id} = req.body;
  const damageOutputResults = await fight(boxerOne, boxerTwo)

  try {
    const { data } = await axios.patch(supabaseAPI + `fight_night?id=eq.${id}`,
    {
      play_by_play: damageOutputResults
    },
    { headers: headersConfig });

    res.status(200) ? res.status(200).json(data) : console.log(res.status)

  } catch (error) {
    console.log(`fight_night patch req error`, error)
  }
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    getHandler(req, res);
  } else if (req.method === 'POST') {
    postHandler(req, res);
  } else if (req.method === `PATCH`) {
    patchHandler(req, res)
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
