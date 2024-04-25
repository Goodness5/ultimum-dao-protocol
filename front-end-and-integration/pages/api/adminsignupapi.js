import { sql } from '@vercel/postgres';

export default async function handler(req, res) {

  try {
    const { username, email, password, gender } = req.body;

    // Check if the email already exists
    const emailCheckQuery = 'SELECT * FROM ultimumadmin WHERE email = $1';
    const emailCheckResult = await sql.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      // If the email already exists, return an error message
      return res.status(400).json({ error: 'Admin already registered' });
    }

    // If the email is not in the database, proceed to signup admin
    const insertQuery = 'INSERT INTO ultimumadmin (username, email, password, gender) VALUES ($1, $2, $3, $4)';
    const values = [username, email, password, gender];

    const result = await sql.query(insertQuery, values);

    res.status(200).json({ message: 'Signed up successfully' });
    console.log("Signed up successfully", result);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Error signing up' });
  } 
}
