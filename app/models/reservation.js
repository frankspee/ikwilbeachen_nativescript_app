export default class Reservation {
    constructor(startDateTime, endDateTime, id, players = []) {
        console.log(startDateTime, endDateTime, id, players);

        this.id = id;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.players = players;
    }
}

// export default {
//     data() {
//         return {
//             id: this.id,
//             startDateTime: this.startDateTime,
//             endDateTime: this.endDateTime,
//             players: this.players
//         }
//     }
// }