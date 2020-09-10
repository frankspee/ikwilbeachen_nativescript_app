export default class Reservation {
    constructor(startDateTime, endDateTime, id, players = []) {
        console.log(startDateTime, endDateTime, id, players);

        this.id = id;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.players = players;
    }
}