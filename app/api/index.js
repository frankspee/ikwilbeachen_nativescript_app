/**
 * Mocking client-server processing
 */
const _reservations = [];

export default {
    getReservations() {
         return _reservations;
    },
    addReservation(reservation) {
        _reservations.unshift(reservation);
        _reservations.sort(
            (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
        );
    },
    deleteReservation(reservation) {
        let index = _reservations.indexOf(reservation);
        _reservations.splice(index, 1);
    }
}