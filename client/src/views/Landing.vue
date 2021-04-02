<template>
  <div class="ml-5 mr-5">
    {{ getLoggedUser }}
  </div>
</template>

<script>
export default {
  computed: {
    getLoggedUser() {
      return this.$store.getters["login/getUser"];
    },
  },
};
</script>