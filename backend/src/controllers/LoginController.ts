import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import db from '../database/connection';
const jwt = require('jsonwebtoken');

dotenv.config();

export default class LoginController {
  async index(request: Request, response: Response) {

    const {
      email,
      password
    } = request.body;


    const user = await db('users').select('*').where('email', String(email));


    if (user.length) {
      const id = user[0].id;
      const validPasswd = bcrypt.compare(password, user[0].password);
      const isPending = user[0].pending;

      if (!validPasswd) {

        return response.status(401).json({ error: "Invalid Credentials", message: "Wrong password." });
      } else if (validPasswd && isPending === true) {

        return response.status(401).json({ error: "E-mail validation error", message: "You must validate your e-mail." });
      } else if (validPasswd && isPending === false) {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: 3600
        });

        delete user[0].password;

        return response.json({ auth: true, token: token, user: user });

      }
    } else {

      return response.status(401).json({ error: "Invalid Credentials", message: "User not found." });
    }

  }
}
