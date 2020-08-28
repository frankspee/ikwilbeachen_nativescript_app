<template>
  <Page>
    <ActionBar>
      <Label text="ikwilbeachen" />
    </ActionBar>

    <GridLayout v-if="showList" rows="*, auto">
      <Label v-if="reservations.length == 0" row="0" class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf45f;" />
          <Span :text="message" />
        </FormattedString>
      </Label>

      <ListView v-else for="reservation in reservations" row="0">
        <v-template>
          <GridLayout columns="auto,auto,auto,*,auto">
            <Label col="0">{{reservation.startDate}}</Label>
            <Label col="1">{{reservation.startTime}} - {{reservation.endTime}}</Label>
            <Label col="2">{{reservation.players}} player(s)</Label>
            <Button col="3" class="-primary" v-on:tap="onJoinTap(reservation)">Join</Button>
            <Label col="4" v-on:tap="onDeleteTap(reservation)">
              <FormattedString>
                <Span class="far" text.decode="&#xf2ed;"></Span>
              </FormattedString>
            </Label>
          </GridLayout>
        </v-template>
      </ListView>

      <Button row="1" class="-outline" v-on:tap="showCreateForm()">
        <FormattedString>
          <Span class="far" text.decode="&#xf271;"></Span>
          <Span text=" Nieuwe reservering"></Span>
        </FormattedString>
      </Button>
    </GridLayout>

    <ScrollView v-else orientation="vertical">
      <StackLayout orientation="vertical">
        <TextField :text="dateFromDateTime(startDate)" editable="false"></TextField>
        <DatePicker v-model="startDate" :minDate="minDate" :maxDate="maxDate" />
        <TextField :text="timeFromDateTime(startTime)" editable="false"></TextField>
        <TimePicker v-model="startTime" :minuteInterval="minuteInterval" />
        <TextField :text="timeFromDateTime(endTime)" editable="false"></TextField>
        <TimePicker v-model="endTime" :minuteInterval="minuteInterval" />
        <Button class="-primary" v-on:tap="onNewTap()">
          <FormattedString>
            <Span class="far" text.decode="&#xf271;"></Span>
            <Span text=" Maak reservering"></Span>
          </FormattedString>
        </Button>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
// ERROR ON TIMEPICKER :minHour="minHour" :maxHour="maxHour" :minMinutes="minMinutes" :maxMinutes="maxMinutes"

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
      reservations: [],
    };
  },
  mounted() {
    this.addReservation();
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
    sortReservations() {
      this.reservations.sort(
        (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
      );
    },
    resetForm() {
      this.startDate = new Date();
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
    showCreateForm() {
      this.showList = false;
    },
    onNewTap() {
      this.addReservation();
      this.sortReservations();
      this.showList = true;
      this.resetForm();
    },
    addReservation() {
      let startDateTime = new Date(this.startDate);
      startDateTime.setHours(this.startTime.getHours());
      startDateTime.setMinutes(this.startTime.getMinutes());
      // console.log(startDateTime);

      let endDateTime = new Date(this.startDate);
      endDateTime.setHours(this.endTime.getHours());
      endDateTime.setMinutes(this.endTime.getMinutes());
      // console.log(endDateTime);

      let reservation = {
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        startDate: this.dateFromDateTime(this.startDate),
        startTime: this.timeFromDateTime(this.startTime),
        endTime: this.timeFromDateTime(this.endTime),
        players: 0,
      };
      this.reservations.unshift(reservation);
    },
    onJoinTap(reservation) {
      reservation.players += 1;
    },
    onDeleteTap(reservation) {
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
