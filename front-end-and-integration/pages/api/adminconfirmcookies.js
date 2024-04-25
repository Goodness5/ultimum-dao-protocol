import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookie from "cookie"
import jwt from 'jsonwebtoken';


const app = express();

app.use(express.json());
app.use(cookieParser());

export default async function handler(req, res) {
    const cookietoken = req.cookies.adminsignincookie;

    if (!cookietoken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decodedToken = jwt.verify(cookietoken, process.env.ADMINSIGNINCOOKIE);
      res.status(200).json({ admin: decodedToken });
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
}
