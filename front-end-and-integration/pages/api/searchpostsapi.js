import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const { query } = req.query;
    const searchTerm = `%${query}%`;

    const searchQuery = 'SELECT * FROM ultimumblog WHERE title ILIKE $1 OR description ILIKE $2 OR category ILIKE $3 ORDER BY id DESC';
    const values = [searchTerm, searchTerm, searchTerm];

    // Use sql.query() and directly destructure the data property
    const data = await sql.query(searchQuery, values);

    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
      console.log(data.rows);
    } else {
      res.status(404).json({ message: 'No results found' });
    }
  } catch (error) {
    console.error('Error querying data from PostgreSQL:', error);
    res.status(500).json({ error: 'Error querying data from PostgreSQL' });
  }
}
