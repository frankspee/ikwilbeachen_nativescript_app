<template>
  <GridLayout columns="auto,auto,auto,*,auto">
    <Label col="0">{{reservation.startDate}}</Label>
    <Label col="1">{{reservation.startTime}} - {{reservation.endTime}}</Label>
    <Label col="2">{{reservation.players.length}} player(s)</Label>
    <Button
      col="3"
      :isEnabled="!isJoined"
      class="-primary"
      v-on:tap="onJoinTap()"
    >
      <FormattedString>
        <Span v-if="!isJoined">Join</Span>
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

export default {
  name: "ReservationItem",
  props: {
    reservation: Object,
  },
  data() {
    return {};
  },
  computed: {
    isJoined() {
      let uuid = platformModule.device.uuid;
      let index = this.reservation.players.indexOf(uuid);
      return index !== -1;
    }
  },
  methods: {
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
        this.$emit('change');
      });
    },
    addPlayer() {
      let uuid = platformModule.device.uuid;
      let index = this.reservation.players.indexOf(uuid);

      console.log("addPlayer() UUID:" + uuid + '| index:' + index);
      if (index === -1) {
        console.log('Player JOINS');
        this.reservation.players.unshift(uuid);
      } else {
        console.log('Player already JOINED');
      }
    }
  },
};
</script>

<style scoped lang="scss">
</style>