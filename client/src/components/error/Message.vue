<template>
  <div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="getType"
      @dismissed="dismissed"
      @dismiss-count-down="countDownChanged"
    >
      {{ getMessage }}
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => {
    return {
      dismissCountDown: 0
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    dismissed() {
      this.dismissCountDown = 0;
      this.$store.dispatch("alerts/clear");
    }
  },
  computed: {
    ...mapGetters("alerts", ["getType", "getMessage"])
  },
  watch: {
    getMessage(newValue) {
      if (newValue !== null) this.dismissCountDown = 10;
    }
  }
};
</script>
