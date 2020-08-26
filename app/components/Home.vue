<template>
  <Page>
    <ActionBar>
      <Label text="ikwilbeachen" />
    </ActionBar>

    <GridLayout rows="*, auto, auto, auto, auto, auto">
      <Label v-if="reservations.length == 0" row="0" class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf45f;" />
          <Span :text="message" />
        </FormattedString>
      </Label>
      <ListView v-else for="reservation in reservations" row="0">
        <v-template>
          <GridLayout columns="auto,auto,auto" v-on:tap="onItemTap(reservation)">
            <Label col="0" :text="reservation.date"></Label>
            <Label col="1" :text="reservation.startTime"></Label>
            <Label col="2" :text="reservation.endTime"></Label>
          </GridLayout>
        </v-template>
      </ListView>
      <Button row="1" class="-primary" v-on:tap="onNewTap()">
        <FormattedString>
          <Span class="far" text.decode="&#xf271;"></Span>
          <Span text=" Nieuwe reservering"></Span>
        </FormattedString>
      </Button>
      <DatePicker row="2" v-model="startDateTime" :minDate="minDate" :maxDate="maxDate" />
      <TimePicker row="3" v-model="startDateTime" :minuteInterval="minuteInterval" />
      <!-- ERROR ON :minHour="minHour" :maxHour="maxHour" :minMinutes="minMinutes" :maxMinutes="maxMinutes" -->
      <TimePicker row="4" v-model="endDateTime" :minuteInterval="minuteInterval" />
      <Label row="5" :text="endDateTime"></Label>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      minDate: new Date(),
      minHour: 9,
      maxHour: 20,
      minMinute: 0,
      maxMinute: 60,
      minuteInterval: 30,
      startDateTime: new Date(),
      endDateTime: null,
      reservations: [],
    };
  },
  computed: {
    message() {
      return " Voeg een reservering toe";
    },
    maxDate() {
      let maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 10);
      return maxDate;
    },
  },
  watch: {
    startDateTime: function (val, oldVal) {
      this.endDateTime = new Date(this.startDateTime);
    },
  },
  methods: {
    sortReservations() {
      this.reservations.sort(
        (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
      );
    },
    dateFromDateTime(dateTime) {
      let dd = String(dateTime.getDate()).padStart(2, "0");
      let mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = dateTime.getFullYear();
      let dateString = dd + "-" + mm + "-" + yyyy;
      return dateString;
    },
    timeFromDateTime(dateTime) {
      let hour = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      if (minutes < 10) minutes = "0" + minutes;
      let time = hour + ":" + minutes;
      return time;
    },
    onNewTap() {
      let startDateTime = this.startDateTime;
      console.log(startDateTime);

      let newDate = this.dateFromDateTime(startDateTime);
      console.log(newDate);

      let startTime = this.timeFromDateTime(startDateTime);
      console.log(startTime);

      console.log(this.endDateTime);
      let endTime = this.timeFromDateTime(this.endDateTime);
      console.log(endTime);

      this.reservations.unshift({
        startDateTime: startDateTime,
        endDateTime: this.endDateTime,
        date: newDate,
        startTime: startTime,
        endTime: endTime,
      });
      this.sortReservations();
    },
    onItemTap(reservation) {
      let index = this.reservations.indexOf(reservation);
      this.reservations.splice(index, 1);
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
