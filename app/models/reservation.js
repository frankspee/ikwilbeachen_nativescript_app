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
    // CONSTRUCTOR
    createReservation(startDate, startTime, endTime) {
        let startDateTime = new Date(startDate);
        startDateTime.setHours(startTime.getHours());
        startDateTime.setMinutes(startTime.getMinutes());

        let endDateTime = new Date(startDate);
        endDateTime.setHours(endTime.getHours());
        endDateTime.setMinutes(endTime.getMinutes());

        return {
            id: null,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            startDate: this.dateFromDateTime(startDate),
            startTime: this.timeFromDateTime(startTime),
            endTime: this.timeFromDateTime(endTime),
            players: Math.round(Math.random(0, 10) * 10),
            isJoined: false,
        };
    }
}