
import { fight } from "../../../controllers/FightController"
import next, { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

const supabaseAPI_fight_history = "https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/fight_history";
const headersConfig = {
    'last_name-Type': 'application/json',
    apiKey:  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`
}

// Controller methods
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.body
    const { data } = await axios.get(supabaseAPI_fight_history + `?id=eq.${id}`, { headers: headersConfig });
    console.log(`[id] get req`, id, data)
    res.status(200).json(data);
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    //   await axios.post(supabaseAPI_fight_history,
    //   {
    //     id: newId,
    //     boxer_1: boxerOne.id,
    //     boxer_2: boxerTwo.id
    //   },
    //   { headers: headersConfig })
      
    //   if (res.status(200)) {
    //     console.log(`fight record successfully created`, res)
    //   } else {
    //     console.log(res.status)
    //   }
  } catch (error) {
    console.log(error)
  }
  res.status(200).json({
    message: 'POST request handled successfully',
  })
};

const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.count(`patch handler ran`)
  const { boxerOne, boxerTwo, id } = req.body;
  const damageOutputResults = await fight(boxerOne, boxerTwo)

  console.log(`patch req body, dmg output`, req.body, damageOutputResults, id)

  try {
    const { data } = await axios.patch(supabaseAPI_fight_history + `?id=eq.${id}`,
    {
      play_by_play: damageOutputResults
    },
    { headers: headersConfig });
    console.log(`patch res, damageOutputResult before returning NextAPIres`, data)

    res.status(200) ? res.status(200).json(data) : console.log(res.status)

  } catch (error) {
    console.log(`fight_night patch req error`, error)
  }
};

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

