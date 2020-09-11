export default class Reservation {
    constructor(startDateTime, endDateTime, id, attendees = []) {
        console.log(startDateTime, endDateTime, id, attendees);

        this.id = id;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.attendees = attendees;
    }
}

// export default {
//     data() {
//         return {
//             id: this.id,
//             startDateTime: this.startDateTime,
//             endDateTime: this.endDateTime,
//             attendees: this.attendees
//         }
//     }
// }