<template>
  <Page>
    <ActionBar>
      <Label text="ikwilbeachen" />
    </ActionBar>

    <GridLayout rows="*, auto">
      <Label v-if="reservations.length == 0" row="0" class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf45f;" />
          <Span :text="message" />
        </FormattedString>
      </Label>
      <ListView v-else for="reservation in reservations" row="0">
        <v-template>
          <Label :text="reservation.date" v-on:tap="onItemTap(reservation)"></Label>
        </v-template>
      </ListView>
      <Button row="1" class="-primary" v-on:tap="onNewTap()">
        <FormattedString>
          <Span class="far" text.decode="&#xf271;"></Span>
          <Span text=" Nieuwe reservering"></Span>
        </FormattedString>
      </Button>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      reservations: [{ date: "1 juli 2020" }],
    };
  },
  computed: {
    message() {
      return " Voeg een reservering toe";
    },
  },
  methods: {
    onNewTap() {
      this.reservations.unshift({ date: "1 augustus 2020" });
    },
    onItemTap(reservation) {
      const index = this.reservations.indexOf(reservation);
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
