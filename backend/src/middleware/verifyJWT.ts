import dotenv from 'dotenv';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');


dotenv.config();

export default function verifyJWT(req: Request, res: Response, next: any){

    let token = req.headers['authorization'];
    token = token?.replace(/^Bearer\s+/, "");
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, function(err: any, decoded: any) {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
      next();
    });
  }
