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
    id: Number,
    startDateTime: Date,
    endDateTime: Date,
    players: Array,
  },
  data() {
    return {
      playerId: platformModule.device.uuid,
    };
  },
  computed: {
    startDate() {
      return this.dateFromDateTime(this.startDateTime);
    },
    startTime() {
      return this.timeFromDateTime(this.startDateTime);
    },
    endTime() {
      return this.timeFromDateTime(this.endDateTime);
    },
    playersCount() {
      return this.players.length;
    },
    joined() {
      let index = this.players.indexOf(this.playerId);
      return index !== -1;
    },
  },
  methods: {
    ...DateTimeHelper,
    onJoinTap() {
      this.addPlayer();

      api
        .updateReservation({
          id: this.id,
          startDateTime: this.startDateTime,
          endDateTime: this.endDateTime,
          players: this.players,
        })
        .then(() => {
          // TODO: improve this local state management with Vuex
          // this.$emit('change');
        });
    },
    onDeleteTap() {
      this.isLoading = true;
      api.deleteReservation(this.id).then(() => {
        // TODO: improve this local state management with Vuex
        this.$emit("change");
      });
    },
    addPlayer() {
      let index = this.players.indexOf(this.playerId);

      console.log("addPlayer() UUID:" + this.playerId + "| index:" + index);
      if (index === -1) {
        console.log("Player JOINS");
        
        // FIXME: LOCAL CHANGE OF PROPS IS NOT ALLOWED WHEN PASSED BY THE PARENT, should go through store or api?
        this.players.unshift(this.playerId);

      } else {
        console.log("Player already JOINED");
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>