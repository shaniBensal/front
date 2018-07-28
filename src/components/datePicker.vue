<template>
<div>
    <v-date-picker
      v-model="date"
      header-color="red"
      :allowed-dates="allowedDates"
      class="mt-3"
      color="red lighten-1"
    ></v-date-picker>
  </div>
</template>
<script>
export default {
  name: "DatePicker",
  data() {
    return {
      date: null
    };
  },
  props: ["unavailableDates"],
  created() {
    this.today();
  },
  mounted() {},
  computed: {},

  methods: {
    today() {
      var result = "";
      var d = new Date();
      result += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.date = result;
    },
    allowedDates(dateStr) {
      return !this.unavailableDates.includes(dateStr);
    }
  }
};
</script>
<style>
</style>
