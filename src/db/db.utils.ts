import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

let db;

export const initDB = async (configService: ConfigService) => {
  db = await mysql.createPool({
    host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  user: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  waitForConnections: true,
  connectionLimit: 10,
  });
};

export const query = async (sql: string, values: any[] = []) => {
  if (!db) throw new Error('Database not initialized');
  const [rows] = await db.execute(sql, values);
  return rows;
};
