<template>
  <GridLayout columns="auto,auto,auto,*,auto">
    <Label col="0">{{reservation.startDate}}</Label>
    <Label col="1">{{reservation.startTime}} - {{reservation.endTime}}</Label>
    <Label col="2">{{reservation.players}} player(s)</Label>
    <Button
      col="3"
      :isEnabled="!reservation.isJoined"
      class="-primary"
      v-on:tap="onJoinTap(reservation)"
    >
      <FormattedString>
        <Span v-if="!reservation.isJoined">Join</Span>
        <Span v-else>Joined</Span>
      </FormattedString>
    </Button>
    <Label col="4" v-on:tap="onDeleteTap(reservation)">
      <FormattedString>
        <Span class="far" text.decode="&#xf2ed;"></Span>
      </FormattedString>
    </Label>
  </GridLayout>
</template>

<script>
import api from "@/api/reservations";

export default {
  name: "ReservationItem",
  props: {
    reservation: Object,
  },
  data() {
    return {};
  },
  methods: {
    onJoinTap(reservation) {
      // FIXME: reservation.addPlayer();
      reservation.players += 1;

      api.updateReservation(reservation).then(() => {
        // TODO: improve this local state management with Vuex
        // this.$emit('change');
      });
      // FIXME: isJoined needs to be a player specific thing??
      reservation.isJoined = true;
    },
    onDeleteTap(reservation) {
      this.isLoading = true;
      api.deleteReservation(reservation).then(() => {
        // TODO: improve this local state management with Vuex
        this.$emit('change');
      });
    }
  },
};
</script>

<style scoped lang="scss">
</style>