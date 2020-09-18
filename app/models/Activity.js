export default class Activity {
    constructor({ startDateTime, endDateTime, creatorId, _id = null, attendees = [] } = {}) {
        console.log(startDateTime, endDateTime, creatorId, _id, attendees);
        
        this._id = _id;
        this.startDateTime = (startDateTime instanceof Date) ? startDateTime : new Date(startDateTime);
        this.endDateTime = (endDateTime instanceof Date) ? endDateTime : new Date(endDateTime);
        this.attendees = attendees;
        this.creatorId = creatorId;
    }
}

// If no reactivity is needed this freeze solution helps.
// export function createActivityModel(activity) {
//     return Object.freeze(new Activity(activity));
// }