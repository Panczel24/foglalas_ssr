import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ReservationsDTO } from './ReservationsDTO.dto.js';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  async reservation() {
    const guestsNumber = await this.appService.getGuests();
    const { rows } = await this.appService.getReservation()
    return { reservation: rows, guestsNumber }
  }


  @Get("newReservations")
  @Render('newReservations')
  getReservs() {

  }

  @Post("newReservations")
  @Render('newReservations')
  async newReservations(@Body() body: ReservationsDTO) {

    const name = body.name;
    const email = body.email;
    const startDate = new Date(body.startDate)
    const date = new Date();
    const guests = body.guests;
    const formData = {
      name: body.name ?? '',
      email: body.email ?? '',
      startDate: body.startDate ?? '',
      guests: body.guests ?? '',
    };

    const emailREGEX = /[a-z.]{1,}@[a-z]{1,}\.[a-z]{1,}/i;

    if (!name) {
      return {
        ...formData,
        error: "Név kötelező"
      }
    }
    if (!emailREGEX.test(body.email)) {
      return {
        ...formData,
        error: "Az email címnek ilyen formátumúnak kell lennie: abc@def.hu"
      }
    }

    if (startDate < date) {
      return {
        ...formData,
        error: "A dátum nem lehet a múltban"
      }
    }
    if (guests < 1) {
      return {
        ...formData,
        error: "Minimum 1 fő szükséges"
      }
    }
    if (guests > 10) {
      return {
        ...formData,
        error: "10 fő a maximum"
      }
    }

    const newReservations = await this.appService.createReservation(name, email, startDate, guests)

    return {
      newReservations, error: ""
    }
  }




}

