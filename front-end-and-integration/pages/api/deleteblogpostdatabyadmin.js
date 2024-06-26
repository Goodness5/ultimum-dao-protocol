import { sql } from '@vercel/postgres';

export default async function handler(req, res) {

  try {
    const {id} = req.body;
    const query = 'DELETE FROM ultimumblog WHERE id=$1';
    const values = [id];

    await sql.query(query, values);

    res.status(200).json({ message: 'Blog post deleted successfully' });
    console.log("Blog post deleted successfully")
  } catch (error) {
    console.error('Error deleting blog data:', error);
    res.status(500).json({ error: 'Error deleting blog data' });
  } 
}

