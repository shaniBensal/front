<template>
    <div v-if="unAvailableDates">
        <v-date-picker header-color="blue" v-model="date" @input="sendDate" :allowed-dates="allowedDates" :min="today" class="mt-3"></v-date-picker>
    </div>
</template>
<script>
export default {
  name: "DatePicker",
  data() {
    return {
      date: "",
      today: ""
    };
  },
  props: ["unAvailableDates"],
  created() {
    this.todayDate();
  },
  mounted() {},
  computed: {

  },
  methods: {
    todayDate() {
      var result = "";
      var month = "";
      var d = new Date();
      if (d.getMonth() + 1 < 10) {
        month = "0" + (d.getMonth() + 1);
      } else {
        month = d.getMonth() + 1;
      }
      result += d.getFullYear() + "-" + month + "-" + d.getDate();
      this.date = result;
      this.today = result;
    },

    allowedDates(dateStr) {
      return !this.unAvailableDates.includes(dateStr);
    },
    sendDate(){
      this.$emit('selected-date', this.date);
    }
  }
};
</script>
<style>
.v-btn.v-btn--active {
  background: blue;
}

.v-btn.v-btn--disabled {
  color: grey;
}
</style>
