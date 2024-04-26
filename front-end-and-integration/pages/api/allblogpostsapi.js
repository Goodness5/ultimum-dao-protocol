import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const query = 'SELECT * FROM ultimumblog ORDER BY id DESC';
   
    //Process the query
    const data = await sql.query(query);

    res.status(200).json(data.rows); // Extract rows
    console.log(data.rows); 
  } catch (error) {
    console.error('Error retrieving blog data:', error);
    res.status(500).json({ error: 'Error retrieving blog data' });
  }
}


