import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const {
      id,
      image_link,
      video_link,
      title,
      date,
      description,
      category
    } = req.body;

    // Construct the SQL query with placeholders for each non-empty field
    let query = 'UPDATE ultimumblog SET';
    const values = [];

    if (image_link) {
      query += ' image_link = $' + (values.length + 1) + ',';
      values.push(image_link);
    }

    if (video_link) {
      query += ' video_link = $' + (values.length + 1) + ',';
      values.push(video_link);
    }

    if (title) {
      query += ' title = $' + (values.length + 1) + ',';
      values.push(title);
    }

    if (date) {
      query += ' date = $' + (values.length + 1) + ',';
      values.push(date);
    }

    if (description) {
      query += ' description = $' + (values.length + 1) + ',';
      values.push(description);
    }

    if (category) {
      query += ' category = $' + (values.length + 1) + ',';
      values.push(category);
    }

    // Remove trailing comma
    query = query.replace(/,$/, '');

    // Add the WHERE clause
    query += ' WHERE id = $' + (values.length + 1);
    values.push(id);

    console.log('SQL Query:', query);
    console.log('Values:', values);

    await sql.query(query, values);

    res.status(200).json({ message: 'Data updated successfully' });
    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error updating blog data:', error);
    res.status(500).json({ error: 'Error updating blog data', details: error.message });
  }
}
