// // // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import nextConnect, { createEdgeRouter } from "next-connect";
// import onError from "../../../middlewares/errors";
import { fight } from "../../../controllers/FightController"
import next, { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

const supabaseAPI = "https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/boxers";
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
      const damageOutputResults = await fight(boxerOne, boxerTwo)

  //   await axios.post('https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/fight_history', req.body,
  //   { headers: headersConfig })
      
      res.json({ damageOutputResults })

  } catch (error) {
    console.log(error)
  }
  res.status(200).json({ message: 'POST request handled successfully' })
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    getHandler(req, res);
    // await axios.get(supabaseAPI, { headers: headersConfig }).then(response => response.data)
  } else if (req.method === 'POST') {
    postHandler(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
