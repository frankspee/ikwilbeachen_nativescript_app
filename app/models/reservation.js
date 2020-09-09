import * as platformModule from "tns-core-modules/platform";

export default class Reservation {
    constructor(startDateTime, endDateTime, id, players = 0) {
        console.log(startDateTime, endDateTime, id, players);

        this.id = id;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.startDate = Reservation.dateFromDateTime(startDateTime);
        this.startTime = Reservation.timeFromDateTime(startDateTime);
        this.endTime = Reservation.timeFromDateTime(endDateTime);
        this.players = players;

        // FIXME: isJoined needs to be a player specific thing??
        this.isJoined = false; 
    }

    addPlayer() {
        console.log("addPlayer() UUID:" + platformModule.device.uuid);
        this.players += 1;
    }

    // toJSON() {
    //     return {
    //         id: this.id,
    //         startDateTime: this.startDateTime,
    //         endDateTime: this.endDateTime,
    //         players: this.players
    //     };
    // }

    // CREATE FROM SUBMIT FORM
    // TODO: should not be in the model...?!
    static newReservation(startDate, startTime, endTime) {
        let startDateTime = new Date(startDate);
        startDateTime.setHours(startTime.getHours());
        startDateTime.setMinutes(startTime.getMinutes());

        let endDateTime = new Date(startDate);
        endDateTime.setHours(endTime.getHours());
        endDateTime.setMinutes(endTime.getMinutes());

        return new Reservation(startDateTime, endDateTime);
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