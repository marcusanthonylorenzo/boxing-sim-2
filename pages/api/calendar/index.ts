import { getDay } from "../../../controllers/CalendarController";
import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import { createClient } from '@supabase/supabase-js'

const supabaseAPI = "https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/";
const headersConfig = {
    'last_name-Type': 'application/json',
    apiKey:  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
    // anonKey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`
}
// const supabase = createClient(`http://localhost:54321`, headersConfig.apiKey)


// Controller methods
const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle GET request logic here
  
const getData = await axios.get(supabaseAPI + `calendar`, { headers: headersConfig })
    .then((response) => response.data )
    .catch((error) => console.log(error))

  console.log(`calendar`, getData)
  res.status(200).json(getData)
  
  // await getDay(req, res, () => {
// })
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {

};

const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log(`postHandlertop`,req.body, Object.keys(req.body))
  const requestId = 1;

   const progressDayAction = async (id: number) => {
       // console.log(`progressDayAction`, req.body.day, typeof id)
       const newDay = req.body.day
       console.log(`new day`, newDay)
       try {
         const { data } = await axios.patch(supabaseAPI + `calendar?id=eq.${id}`,
           {
             day: newDay
           }, 
           {
             headers: {
               "apikey": headersConfig.apiKey,
               "Authorization": headersConfig['Authorization'],
               "Content-Type": "application/json",
               "Prefer": "return=representation"
             }
         })
         console.log(data)
       } catch (err) {
         console.error(err)
       }  
   };
   try {
       progressDayAction(requestId)
       res.status(200).json({ message: 'POST request handled successfully' })
   } catch (error) {
       console.log(error)
   }
}

// // API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    getHandler(req, res);
  } else if (req.method === 'POST') {
    postHandler(req, res);
  } else if (req.method === 'PATCH') {
    patchHandler(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
