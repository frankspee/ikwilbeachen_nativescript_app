import * as platformModule from "tns-core-modules/platform";

export default {
    // UTILS
    dateFromDateTime(dateTime) {
        let dd = String(dateTime.getDate()).padStart(2, "0");
        let mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = dateTime.getFullYear();
        let dateString = dd + "-" + mm + "-" + yyyy;
        return dateString;
    },
    timeFromDateTime(dateTime) {
        let hour = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;
        let time = hour + ":" + minutes;
        return time;
    },
    // METHODS
    newReservation(startDate, startTime, endTime) {
        let startDateTime = new Date(startDate);
        startDateTime.setHours(startTime.getHours());
        startDateTime.setMinutes(startTime.getMinutes());

        let endDateTime = new Date(startDate);
        endDateTime.setHours(endTime.getHours());
        endDateTime.setMinutes(endTime.getMinutes());

        return this.createReservation(startDateTime, endDateTime);
    },
    createReservation(startDateTime, endDateTime, id, players = 0) {
        let reservation = {
            id: id,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            startDate: this.dateFromDateTime(startDateTime),
            startTime: this.timeFromDateTime(startDateTime),
            endTime: this.timeFromDateTime(endDateTime),
            players: players,
            isJoined: false, // FIXME: isJoined needs to be a player specific thing??
        };
        return reservation;
    },
    addPlayer()  {
        console.log("addPlayer() UUID:" + platformModule.device.uuid);
    }
}