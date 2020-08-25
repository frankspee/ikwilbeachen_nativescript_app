<template>
  <Page>
    <ActionBar>
      <Label text="ikwilbeachen" />
    </ActionBar>

    <GridLayout rows="*, auto">
      <Label v-if="reservations.length == 0" row="0" class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf45f; " />
          <Span :text="message" />
        </FormattedString>
      </Label>
      <ListView v-if="reservations.length > 0" for="reservation in reservations" row="0">
        <Label :text="reservation.date"></Label>
      </ListView>
      <Button row="1" class="-primary2" v-on:tap="onTap()">
        <FormattedString>
          <Span class="fas" text="&#xf45f;"></Span>
          <Span text=" Nieuw 2"></Span>
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
      return "Voeg een reservering toe";
    },
  },
  methods: {
    onTap() {
      // this.reservations.unshift({date:"1 augustus 2020"});
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
