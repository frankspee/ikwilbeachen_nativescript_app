import * as http from 'tns-core-modules/http';

import Reservation from "@/models/Reservation";

const _baseUrl = "http://10.0.2.2:3000/reservations/";
// const _baseUrl = "https://ikwilbeachen.azurewebsites.net/reservations/";

export default {
  getReservations() {
    return http.request({
      url: _baseUrl,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        return data.map(reservation => {
          return new Reservation(
            new Date(reservation.startDateTime),
            new Date(reservation.endDateTime),
            parseInt(reservation.id),
            parseInt(reservation.players)
          );
        });
      })
  },
  createReservation(reservation) {
    return http.request({
      url: _baseUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      content: JSON.stringify(reservation)
    })
      .then(this.validateCode)
      .then(this.getJson)
      .then(reservation => {
        return new Reservation(
          new Date(reservation.startDateTime),
          new Date(reservation.endDateTime),
          parseInt(reservation.id),
          parseInt(reservation.players)
        );
      })
  },
  updateReservation(reservation) {
    return http.request({
      url: _baseUrl + reservation.id,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      content: JSON.stringify(reservation)
    })
      .then(this.validateCode)
      .then(new Promise((resolve, reject) => {
        resolve(response);
      }))
      .catch(e => {
        let message = 'Could not update the reservation with id: ' + reservation.id + '. Error: ' + e;
        console.error(message);
        throw message;
      })
  },
  deleteReservation(reservation) {
    return http.request({
      url: _baseUrl + reservation.id,
      method: 'DELETE',
    })
      .then(this.validateCode)
      .then(new Promise((resolve, reject) => {
        resolve(response);
      }))
      .catch(e => {
        let message = 'Could not delete the reservation with id: ' + reservation.id + '. Error: ' + e;
        console.error(message);
        throw message;
      })
  },
  validateCode(response) {
    return new Promise((resolve, reject) => {
      if ((response.statusCode >= 200 && response.statusCode < 300) || response.statusCode == 404) {
        resolve(response);
      }
      reject('Response with code: ' + response.statusCode +
        '\nContent: ' + response.content.toString());
    })
  },
  getJson(response) {
    return new Promise((resolve, reject) => {
      resolve(response.content.toJSON());
    })
      .catch(e => {
        let message = 'Error parsing JSON response: ' + e;
        console.error(message);
        throw message;
      })
  }
}