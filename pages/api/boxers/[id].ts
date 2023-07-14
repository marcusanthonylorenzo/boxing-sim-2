// // // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import nextConnect, { createEdgeRouter } from "next-connect";
// import onError from "../../../middlewares/errors";
import { getAllBoxers, createBoxer, deleteBoxer } from "../../../controllers/BoxerController"
import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";


const headersConfig = {
    'last_name-Type': 'application/json',
    apiKey:  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`
}

// Controller methods
const getHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // Handle GET request logic here
  
  res.status(200).json({ message: 'GET request handled successfully' });
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle POST request logic here
  res.status(200).json({ message: 'POST request handled successfully' });
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    getHandler(req, res);


  } else if (req.method === 'DELETE') {
    deleteHandler(req, res);
    console.log(`id delete`, res)

      try {
        await axios.delete(`https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/boxers?id=eq.${req.body.id}`,
        { 
            headers: {
                apiKey: headersConfig.apiKey,
                Authorization: headersConfig.Authorization
            }
        })
      } catch (error) {
        // console.log(`delete req`, error.response)
      }

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
