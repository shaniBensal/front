<template>
    <v-layout row class="mb-2">
        <v-flex>
            <v-date-picker v-model="date" header-color="red" class="mt-3" color="red lighten-1"></v-date-picker>
            {{date}}
        </v-flex>
    </v-layout>

</template>
<script>
export default {
  name: "DatePicker",
  data() {
    return {
      date: new Date(),
    };
  },
  // :allowed-dates="allowedDates"
  // prop: ['unavailableDates'],
  created() {
    // this.today();
  },
  mounted() {},
  computed: {},

  methods: {
    // today() {
    //   var result = "";
    //   var d = new Date();
    //   result += d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    //   this.date = result;
    // },
    // allowedDates(dateStr) {
    //   return !this.unavailableDates.includes(dateStr);
    // }
  }
};
</script>
<style>
</style>
