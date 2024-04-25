import { sql } from '@vercel/postgres';

export default async function handler(req, res) {

  try {
    const { id, image_link, video_link, title, date, description, category } = req.body;
    const query = 'INSERT INTO ultimumblog (image_link, video_link, title, date, description, category) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [image_link, video_link, title, date, description, category];

    await sql.query(query, values);

    res.status(200).json({ message: 'Blog post added successfully' });
    console.log("Blog post added successfully")
  } catch (error) {
    console.error('Error adding blog data in datase:', error);
    res.status(500).json({ error: 'Error adding blog data in database' });
  } 
}

