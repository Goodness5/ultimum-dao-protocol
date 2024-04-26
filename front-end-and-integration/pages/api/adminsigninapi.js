import { sql } from '@vercel/postgres';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookie from "cookie"
import jwt from 'jsonwebtoken';

const allowedOrigins = ['http://localhost:3000', 'https://ultimum.vercel.app'];
const app = express();
app.use(cors({
  origin: allowedOrigins,
  methods: ['POST', 'GET'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

export default async function handler(req, res) {
  try {
    // Extract email, password and secretkey from the request body
    const { email, password, secretkey } = req.body;

    // Make the query and present values
    const query = 'SELECT * FROM ultimumadmin WHERE email=$1 AND password=$2 AND secretkey=$3';
    const values = [email, password, secretkey];

    // process query
    const data = await sql.query(query, values);

    // Check if data was retrieved and start cookie creation
    if (data.rows.length > 0) {
      const admininfo = {
        // admin data
        username: data.rows[0].username,
        email: data.rows[0].email,
        gender: data.rows[0].gender,
      };

          // Create a JWT token
          const jwttoken = jwt.sign(admininfo, process.env.ADMINSIGNINCOOKIE);

          // Set the JWT token as a cookie using the 'cookie' package
          res.setHeader('Set-Cookie', cookie.serialize('adminsignincookie', jwttoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 72, 
            sameSite: 'strict',
            path: '/',
          }));
    
      res.status(200).json(data.rows);
      console.log(data.rows);
    } else {
      console.log('Data not found');
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.error('Error retrieving data from database:', error);
    res.status(500).json({ error: 'Error retrieving data from database' });
  }
}
