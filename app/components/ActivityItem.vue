<template>
  <GridLayout columns="auto,auto,auto,*,auto">
    <Label col="0">{{startDate}}</Label>
    <Label col="1">{{startTime}} - {{endTime}}</Label>
    <Label col="2">{{attendeesCount}} speler(s)</Label>
    <Button col="3" :isEnabled="!joined" class="-primary" v-on:tap="onJoinTap()">
      <FormattedString>
        <Span v-if="!joined">Join</Span>
        <Span v-else>Joined</Span>
      </FormattedString>
    </Button>
    <Label col="4" v-show="canDelete" v-on:tap="onDeleteTap()">
      <FormattedString>
        <Span class="far" text.decode="&#xf2ed;"></Span>
      </FormattedString>
    </Label>
  </GridLayout>
</template>

<script>
import * as platformModule from "tns-core-modules/platform";

import DateTimeHelper from "@/helpers/DateTimeHelper";

import Activity from "@/models/Activity";

export default {
  name: "ActivityItem",
  props: {
    activity: Activity,
  },
  data() {
    return {
      // no data yet?!
    };
  },
  computed: {
    startDate() {
      return this.dateFromDateTime(this.activity.startDateTime);
    },
    startTime() {
      return this.timeFromDateTime(this.activity.startDateTime);
    },
    endTime() {
      return this.timeFromDateTime(this.activity.endDateTime);
    },
    attendeesCount() {
      return this.activity.attendees.length;
    },
    joined() {
      let index = this.activity.attendees.indexOf(platformModule.device.uuid);
      return index !== -1;
    },
    canDelete() {
      return platformModule.device.uuid === this.activity.creatorId;
    },
  },
  methods: {
    ...DateTimeHelper,
    onJoinTap() {
      this.$store.dispatch("addAttendee", this.activity).catch((e) => {
        console.log(e);
        alert("An error occurred joining an activity.");
      });
    },
    onDeleteTap() {
      confirm(
        `Do you really want to delete the activity on ${this.startDate} ${this.startTime}-${this.endTime}?`
      ).then((result) => {
        if (result) this.deleteActivity();
      });
    },
    deleteActivity() {
      if (!this.canDelete) {
        alert("You can not delete an activity created by someone else.");
        return;
      }

      this.$store.dispatch("deleteActivity", this.activity._id).catch((e) => {
        console.log(e);
        alert("An error occurred deleting an activity.");
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>