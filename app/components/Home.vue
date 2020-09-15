<template>
  <Page>
    <ActionBar>
      <Label text="ikwilbeachen" />
    </ActionBar>

    <GridLayout v-if="showList" rows="*,auto">
      <ActivityIndicator v-if="loading" :busy="loading" />

      <Label v-if="!hasActivities && !loading" row="0" class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf45f;" />
          <Span text=" Nog geen VrijSpelen bekend" />
        </FormattedString>
      </Label>

      <ListView v-else row="0" for="activity in activities">
        <v-template>
          <ActivityItem :activity="activity" v-on:change="onItemChange()" />
        </v-template>
      </ListView>

      <Button
        row="1"
        :class="[{'-primary' : !hasActivities},{'-outline' : hasActivities}]"
        v-on:tap="onAddFormTap()"
      >
        <FormattedString>
          <Span class="far" text.decode="&#xf271;"></Span>
          <Span text=" Voeg nieuw VrijSpelen toe"></Span>
        </FormattedString>
      </Button>
    </GridLayout>

    <GridLayout v-else rows="auto,auto,auto,auto,auto,*,auto">
      <TextField
        row="0"
        :text="dateFromDateTime(startDate)"
        editable="false"
        v-on:tap="onStartDateTap()"
      ></TextField>
      <DatePicker
        row="1"
        v-show="showStartDateInput"
        v-model="startDate"
        :minDate="minDate"
        :maxDate="maxDate"
      />
      <TextField
        row="2"
        :text="timeFromDateTime(startTime)"
        editable="false"
        v-on:tap="onStartTimeTap()"
      ></TextField>
      <TimePicker
        row="3"
        v-show="showStartTimeInput"
        v-model="startTime"
        :minuteInterval="minuteInterval"
      />
      <TextField
        row="4"
        :text="timeFromDateTime(endTime)"
        editable="false"
        v-on:tap="onEndTimeTap()"
      ></TextField>
      <TimePicker
        row="5"
        v-show="showEndTimeInput"
        v-model="endTime"
        :minuteInterval="minuteInterval"
      />
      <StackLayout row="6" orientation="horizontal">
        <Button width="33%" class="-outline" v-on:tap="onCancelTap()" text="Annuleren" />
        <Button
          width="50%"
          horizontalAlignment="right"
          class="-primary"
          v-on:tap="onSubmitFormTap()"
        >
          <FormattedString>
            <Span class="far" text.decode="&#xf274;"></Span>
            <Span text=" VrijSpelen opslaan"></Span>
          </FormattedString>
        </Button>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
// ERROR ON TIMEPICKER :minHour="minHour" :maxHour="maxHour" :minMinutes="minMinutes" :maxMinutes="maxMinutes"

import { mapState, mapGetters, mapActions } from "vuex";

import DateTimeHelper from "@/helpers/DateTimeHelper";

import Reservation from "@/models/Reservation";

import ActivityItem from "./ActivityItem";

export default {
  data() {
    return {
      showList: true,
      minDate: new Date(),
      minHour: 8,
      maxHour: 22,
      minMinute: 0,
      maxMinute: 60,
      minuteInterval: 30,
      startDate: new Date(),
      startTime: null,
      endTime: null,
      showStartDateInput: false,
      showStartTimeInput: false,
      showEndTimeInput: false,
    };
  },
  components: {
    ActivityItem,
  },
  mounted() {
    this.getActivities();

    // FIXME: this is a debug activity for easy testing
    this.submitActivity();
  },
  computed: {
    // LIST
    ...mapState(["loading"]),
    ...mapGetters({activities: 'activitiesSorted'}),
    hasActivities() {
      return this.activities.length > 0;
    },
    // FORM
    maxDate() {
      let maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 10);
      return maxDate;
    },
  },
  watch: {
    // FORM
    startDate: {
      handler: function (val, oldVal) {
        let minutes = this.startDate.getMinutes();
        if (minutes > 30) minutes = 60;
        else minutes = 30;
        this.startDate.setMinutes(minutes);
        this.startDate.setSeconds(0);
        this.startTime = new Date(this.startDate);
        this.endTime = new Date(this.startDate);
      },
      immediate: true,
    },
    startTime: {
      handler: function (val, oldVal) {
        // console.log("startTime:" + this.startTime);
        if (val.getHours() < this.minHour) {
          this.startTime.setHours(this.minHour);
          this.startTime.setMinutes(0);
        }
        if (
          val.getHours() > this.maxHour ||
          (val.getHours() === this.maxHour && val.getMinutes() > 0)
        ) {
          this.startTime.setHours(this.maxHour);
          this.startTime.setMinutes(0);
        }
        // console.log('startTimeC:' + this.startTime);
        // console.log('endTime: ' + this.endTime);
        // console.log('s>=e: ' + (this.startTime >= this.endTime));
        if (this.startTime.getHours() >= this.endTime.getHours()) {
          this.endTime = new Date(this.startTime);
          this.endTime.setTime(this.startTime.getTime() + 1 * 60 * 60 * 1000); // get time plus 1 hour
        }
      },
      immediate: true,
    },
    endTime: {
      handler: function (val, oldVal) {
        // console.log("endTime: " + this.endTime);
        if (val.getHours() < this.minHour) {
          this.endTime.setHours(this.minHour);
          this.endTime.setMinutes(0);
        }
        if (
          val.getHours() > this.maxHour ||
          (val.getHours() === this.maxHour && val.getMinutes() > 0)
        ) {
          this.endTime.setHours(this.maxHour);
          this.endTime.setMinutes(0);
        }
        // console.log('endTimeC: ' + this.endTime);
        // console.log('startTime:' + this.startTime);
        // console.log('e<=s: ' + (this.endTime <= this.startTime));
        if (this.endTime.getHours() <= this.startTime.getHours()) {
          this.startTime = new Date(this.endTime);
          this.startTime.setTime(this.endTime.getTime() - 1 * 60 * 60 * 1000); // get time minus 1 hour
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["getActivities", "createActivity"]),
    ...DateTimeHelper,
    // LIST
    onItemChange() {
      // no item change calls anymore
    },
    onAddFormTap() {
      this.resetForm();
      this.showList = false;
    },
    // FORM
    resetForm() {
      this.startDate = new Date();
      this.showStartDateInput = true;
      this.showStartTimeInput = false;
      this.showEndTimeInput = false;
    },
    onStartDateTap() {
      this.showStartDateInput = !this.showStartDateInput;
      this.showStartTimeInput = false;
      this.showEndTimeInput = false;
    },
    onStartTimeTap() {
      this.showStartDateInput = false;
      this.showStartTimeInput = !this.showStartTimeInput;
      this.showEndTimeInput = false;
    },
    onEndTimeTap() {
      this.showStartDateInput = false;
      this.showStartTimeInput = false;
      this.showEndTimeInput = !this.showEndTimeInput;
    },
    onCancelTap() {
      this.showList = true;
    },
    onSubmitFormTap() {
      this.submitActivity();
      this.showList = true;
    },
    submitActivity() {
      let startDateTime = new Date(this.startDate);
      startDateTime.setHours(this.startTime.getHours());
      startDateTime.setMinutes(this.startTime.getMinutes());

      let endDateTime = new Date(this.startDate);
      endDateTime.setHours(this.endTime.getHours());
      endDateTime.setMinutes(this.endTime.getMinutes());

      let activity = new Reservation(startDateTime, endDateTime);

      this.$store.dispatch("createActivity", activity).catch(() => {
        alert("An error occurred creating an activity.");
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/ruby";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
