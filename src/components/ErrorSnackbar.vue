<template>
  <v-snackbar
    shaped
    v-model="this.$store.state.isErrorAlert"
    timeout="4000"
    color="#D50000"
    top
    right
  >
    {{ this.$store.state.message }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="closeAlert()"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  computed: {
  },
  methods: {
    closeAlert() {
      this.$store.commit("closeErrorAlert");
    },
  },
};
</script>
<style scoped>
.snackbar {
  color: #823744;
  background-color: white;
}
</style>