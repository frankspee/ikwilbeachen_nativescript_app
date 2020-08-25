<template>
  <Page>
    <ActionBar>
      <Label text="ikwilbeachen" />
    </ActionBar>

    <GridLayout rows="*, auto">
      <Label row="0" class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf45f; " />
          <Span :text="message" />
        </FormattedString>
      </Label>
      <Button row="1" class="-primary2" v-on:tap="onTap()">
        <FormattedString>
          <Span class="fas" text="&#xf45f;"></Span>
          <Span text=" Nieuw"></Span>
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
