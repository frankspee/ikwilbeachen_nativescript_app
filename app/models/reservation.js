import DateTimeHelper from '@/helpers/DateTimeHelper';

export default class Reservation {
    constructor(startDateTime, endDateTime, id, players = []) {
        console.log(startDateTime, endDateTime, id, players);

        this.id = id;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.startDate = DateTimeHelper.dateFromDateTime(startDateTime);
        this.startTime = DateTimeHelper.timeFromDateTime(startDateTime);
        this.endTime = DateTimeHelper.timeFromDateTime(endDateTime);
        this.players = players;
    }
}