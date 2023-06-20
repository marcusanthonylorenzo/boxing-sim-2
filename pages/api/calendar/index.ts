import { getDay } from "../../../controllers/CalendarController";
import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

const supabaseAPI = "https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/";
const headersConfig = {
    'last_name-Type': 'application/json',
    apiKey:  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`,
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeHV1aXBrc2x6YmN1ZnNnbGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5ODcyNzYsImV4cCI6MjAwMTU2MzI3Nn0.O9oHaGdbL9cG3DC2JroEB3x5PZRmL9RYfmko_0UKGGc`
}

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

// const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Handle POST request logic here
//   res.status(200).json({ message: 'POST request handled successfully' })
// };

// // API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    getHandler(req, res);
  } else if (req.method === 'POST') {
    // postHandler(req, res);

    // axios.post('https://cjxuuipkslzbcufsgldx.supabase.co/rest/v1/boxers', req.body,
    // { headers: headersConfig })

  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
