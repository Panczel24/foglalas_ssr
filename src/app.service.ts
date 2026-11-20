import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Reservations } from './Reservations.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservations13e',
});


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getReservation() {
    const [result] = await mysqlConnection.execute('SELECT id, name, email, startDate, guests FROM `reservations`');
    const rows = result as Reservations[];
    return { rows };
  }

  async createReservation(name: string, email: string, startDate: Date, guests: number) {
    const [result] = await mysqlConnection.execute(
      'INSERT INTO reservations (name, email, startDate, guests) VALUES (?, ?, ?, ?)',
      [name, email, startDate, guests]
    );
    const rosw = result as any;
    return {
      id: rosw.insertId, name, email, startDate, guests
    } as Reservations
  }


  async getGuests() {
    const [result] = await mysqlConnection.execute('SELECT COUNT(*) as Osszes FROM `reservations`');
    const rows = result as { Osszes: number }[];
    return rows[0].Osszes;
  }




}
