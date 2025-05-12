import { Injectable } from '@nestjs/common';
import { query } from 'src/db/db.utils';

@Injectable()
export class AuthRepository {

  async findUserByLogin(email: string, password: string) {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const result = await query(sql, [email, password]);
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  }

  async findUserByEmail(email: string) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const result = await query(sql, [email]);
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  }

  async createUser(fullName: string, number: string, email: string, password: string) {
    const sql = `
      INSERT INTO users (fullName, number, email, password)
      VALUES (?, ?, ?, ?)
    `;
    await query(sql, [fullName, number, email, password]);
  }
  
}
