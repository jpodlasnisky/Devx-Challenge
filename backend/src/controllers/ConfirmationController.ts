import dotenv from 'dotenv';
import { Request, Response } from 'express';
import db from '../database/connection';
const jwt = require('jsonwebtoken');

dotenv.config();

export default class ConfirmationController {
  async verifyUser(request: Request, response: Response) {
    const user = await db('users').select('id', 'email').where('confirmation_token', String(request.params.confirmationCode));

    const id = user[0].id;

    const trx = await db.transaction();
    let updateUser = await trx("users").update({
      pending : false,
      confirmation_token: 'already_validated'
    }).where('id', id);
    if (user.length) {

      await trx.commit();

      return response.status(201).json({
        success: `E-mail ${user[0].email} successfully validated`
      });

    }

  }
}
