<template>
  <GridLayout columns="auto,auto,auto,*,auto">
    <Label col="0">{{startDate}}</Label>
    <Label col="1">{{startTime}} - {{endTime}}</Label>
    <Label col="2">{{attendeesCount}} attendee(s)</Label>
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

import DateTimeHelper from "@/helpers/DateTimeHelper";

export default {
  name: "ActivityItem",
  props: {
    activity: Object,
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
  },
  methods: {
    ...DateTimeHelper,
    onJoinTap() {
      this.$store.dispatch("addAttendee", this.activity).catch(() => {
        alert("An error occurred joining an activity.");
      });
    },
    onDeleteTap() {
      this.$store.dispatch("deleteActivity", this.activity.id).catch(() => {
        alert("An error occurred deleting an activity.");
      });
    }
  },
};
</script>

<style scoped lang="scss">
</style>