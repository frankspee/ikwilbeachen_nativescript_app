<template>
  <GridLayout columns="auto,auto,auto,*,auto">
    <Label col="0">{{startDate}}</Label>
    <Label col="1">{{startTime}} - {{endTime}}</Label>
    <Label col="2">{{playersCount}} player(s)</Label>
    <Button col="3" :isEnabled="!joined" class="-primary" v-on:tap="onJoinTap()">
      <FormattedString>
        <Span v-if="!joined">Join</Span>
        <Span v-else>Joined</Span>
      </FormattedString>
    </Button>
    <Label col="4" v-on:tap="onDeleteTap()">
      <FormattedString>
        <Span class="far" text.decode="&#xf2ed;"></Span>
      </FormattedString>
    </Label>
  </GridLayout>
</template>

<script>
import * as platformModule from "tns-core-modules/platform";

import api from "@/api/reservations";

import DateTimeHelper from "@/helpers/DateTimeHelper";

export default {
  name: "ReservationItem",
  props: {
    reservation: Object,
  },
  data() {
    return {};
  },
  computed: {
    startDate() {
      return this.dateFromDateTime(this.reservation.startDateTime);
    },
    startTime() {
      return this.timeFromDateTime(this.reservation.startDateTime);
    },
    endTime() {
      return this.timeFromDateTime(this.reservation.endDateTime);
    },
    playersCount() {
      return this.reservation.players.length;
    },
    joined() {
      let uuid = platformModule.device.uuid;
      let index = this.reservation.players.indexOf(uuid);
      return index !== -1;
    },
  },
  methods: {
    ...DateTimeHelper,
    onJoinTap() {
      this.addPlayer();

      api.updateReservation(this.reservation).then(() => {
        // TODO: improve this local state management with Vuex
        // this.$emit('change');
      });
    },
    onDeleteTap() {
      this.isLoading = true;
      api.deleteReservation(this.reservation).then(() => {
        // TODO: improve this local state management with Vuex
        this.$emit("change");
      });
    },
    addPlayer() {
      let uuid = platformModule.device.uuid;
      let index = this.reservation.players.indexOf(uuid);

      console.log("addPlayer() UUID:" + uuid + "| index:" + index);
      if (index === -1) {
        console.log("Player JOINS");
        this.reservation.players.unshift(uuid);
      } else {
        console.log("Player already JOINED");
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>