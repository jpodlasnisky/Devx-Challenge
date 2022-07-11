import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import db from '../database/connection';
import Queue from '../redis/queue';

dotenv.config();

export default class ConnectionsController {
  async create(request: Request, response: Response) {
    let {
      name,
      email,
      password,
      is_admin
    } = request.body

    const trx = await db.transaction();

    password = bcrypt.hashSync(password, 10);

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let verificationToken = '';
    for (let i = 0; i < 25; i++) {
      verificationToken += characters[Math.floor(Math.random() * characters.length )];
    }

    try {
      const insertUser = await trx("users").insert({
        name,
        email,
        password,
        is_admin,
        is_active: true,
        pending : true,
        confirmation_token: verificationToken
      });

      await Queue.add('ConfirmEmail', { name, email, verificationToken });

      await trx.commit();

      return response.status(201).json({
        success: `User ${email} created successfully`
      });
    } catch (e) {
      console.log(e)
      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating user"
      });
    }
  }
  async show(request: Request, response: Response) {
    const users = await db('users').select('name', 'email');

    return response.json(users);
  }
}
