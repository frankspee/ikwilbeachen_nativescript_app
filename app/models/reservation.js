export default class Reservation {
    constructor(startDateTime, endDateTime, id, players = []) {
        console.log(startDateTime, endDateTime, id, players);

        this.id = id;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.startDate = Reservation.dateFromDateTime(startDateTime);
        this.startTime = Reservation.timeFromDateTime(startDateTime);
        this.endTime = Reservation.timeFromDateTime(endDateTime);
        this.players = players;
    }

    // UTILS
    static dateFromDateTime(dateTime) {
        let dd = String(dateTime.getDate()).padStart(2, "0");
        let mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = dateTime.getFullYear();
        let dateString = dd + "-" + mm + "-" + yyyy;
        return dateString;
    }

    static timeFromDateTime(dateTime) {
        let hour = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let time = hour + ":" + minutes;
        return time;
    }
}