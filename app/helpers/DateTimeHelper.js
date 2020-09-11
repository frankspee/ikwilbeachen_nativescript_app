export default {
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
        let timeString = hour + ":" + minutes;
        return timeString;
    }
}