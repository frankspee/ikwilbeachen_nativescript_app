import * as http from 'tns-core-modules/http';

const _baseUrl = "http://localhost:3000/reservations/";

export default {
    getReservations() {
      console.log('api/reservations/');
      http.request({url: "http://localhost:3000/reservations/", method: 'GET'});
        // return http.request({
        //     url: _baseUrl,
        //     method: 'GET',
        //     // headers: {'Content-Type': 'application/json'},
        //   })
        //   .then(this.validateCode)
        //   .then(this.getJson)
        //     .then(data => {
        //       console.info(data);
        //       console.info(`Received ${data.length} reservations from the backend.`)
        //       return data;
        //   })
    },
    addReservation(reservation) {
      console.log('creating: ' + reservation);
        // return http.request({
        //   url: _baseUrl,
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json'},
        //   content: JSON.stringify(reservation)
        // })
        // .then(this.validateCode)
        // .then(this.getJson)
        // .then(data => {
        //   console.info(`Added reservation with startDateTime ${reservation.startDateTime}.`)
        //   return reservation;
        // })
    },
    deleteReservation(reservation) {
        console.log('deleting: ' + reservation.id);
        // return http.request({
        //     url: _baseUrl + reservation.id,
        //     method: 'DELETE',
        //     headers: {'Content-Type': 'application/json'},
        //   })
        //   .then(this.validateCode)
        //   .then(this.getJson)
        //   .then(data => {
        //     console.info(data)
        //     console.info(`Deleted reservation with id ${reservation.id}.`)
        //     return reservation
        //   })
    },

    // validateCode(response) {
    //     return new Promise((resolve, reject) => {
    //       if (response.statusCode >= 200 && response.statusCode < 300) {
    //         resolve(response)
    //       }
    //       console.log('Response with code: ' + response.statusCode +
    //         '\nContent: ' + response.content.toString())
    //       reject('Response with code: ' + response.statusCode +
    //         '\nContent: ' + response.content.toString())
    //     })
    //   },
    
    //   getJson(response) {
    //     return new Promise((resolve, reject) => {
    //       console.info('Content: ' + response.content.toString())
    //       resolve(response.content.toJSON())
    //     })
    //       .catch(e => {
    //         console.error('Error parsing JSON response: ' + e)
    //         throw 'Error parsing JSON response: ' + e
    //       })
    //   }
}