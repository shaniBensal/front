<template>
    <div class="book-page">
        <confirm-modal :open="open" @closeModal="closeModal"></confirm-modal>
        <div class="d-inline-flex">
            <div>
                <div>
                    <img class="main-image" :src="item.images[0]">
                </div>
                <div>
                    <h1>Hi {{userName}}!</h1>
                    <br /> You chose to rent {{itemName}}
                    <p>From {{owner.name}} </p>
                    <p> pickup address is {{owner.address}}</p>
                    <!-- {{item}} -->
                    <p>
                        <!-- Start Date: {{dealDetails.firstDay}} <br />
            Last Date: {{dealDetails.lastDay}} <br /> -->
                        <!-- Days Count: {{dealDetails.daysToRent}} <br /> -->
                        In date: {{selectedDateRent}}
                        <br /> Price For Day: {{item.price}}$
                        <br />
                        <!-- Price: {{totalCost}}$ -->
                    </p>
                    <!-- <v-flex class="d-inline-flex">
            <div class="date-picker-schedual table-container">
                <v-date-picker header-color="blue" @input="calculateFirstDate" v-model="dealDetails.firstDay" :allowed-dates="allowedDates" :min="today"></v-date-picker>
            </div>
            <div class="date-picker-schedual table-container">
                <v-date-picker header-color="blue" @input="daysCount" v-model="dealDetails.lastDay" :allowed-dates="allowedDates" :min="dealDetails.firstDay||today"></v-date-picker>
            </div>
        </v-flex> -->
                </div>
            </div>
            <button class="btn bold-font" @click.prevent="approveDeal">Submit</button>
            <button class="btn bold-font" @click.prevent="cancel">Back</button>
            <div>
              <things-you-might></things-you-might>
            </div>
        </div>
    </div>
</template>
<script>
import datePicker from "./datePicker.vue";
import confirmModal from "./confirmModal.vue";

export default {
  name: "BookItem",
  props: ["selectedDate"],
  data() {
    return {
      firstDateTimeStamp: null,
      secDateTimeStamp: null,
      itemName: null,
      today: null,
      userName: null,
      open: false,
      dealDetails: {
        userId: null,
        itemId: null,
        daysToRent: 1,
        firstDay: null,
        lastDay: null,
        totalPrice: null
      }
    };
  },
  created() {
    this.loadItem(this.$route.params.id);
    this.todayDate();
    // this.allowedDates();
  },
  methods: {
    loadItem(itemId) {
      this.$store
        .dispatch({ type: "loadItemById", itemId })
        .then(item => {
          return this.$store.dispatch({
            type: "loadUserById",
            ownerId: item.ownerId
          });
        })
        .then(() => this.loadFirstData());
    },
    loadFirstData() {
      this.itemName = this.$store.getters.selectedItem.title;
      this.dealDetails.firstDay = this.selectedDate;
      this.userName = this.$store.getters.loggedinUser.name;
      this.dealDetails.userId = this.$store.getters.loggedinUser._id;
      this.dealDetails.itemId = this.$store.getters.selectedItem._id;
      this.dealDetails.totalPrice = this.$store.getters.selectedItem.price;
    },
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
      this.today = result;
    },
    approveDeal() {
      var item = { ...this.$store.getters.selectedItem };
      let datesArray = JSON.parse(JSON.stringify(item.occupiedDates));
      datesArray.push(this.dealDetails.firstDay);
      item.occupiedDates = datesArray;

      var user = { ...this.$store.getters.loggedinUser };
      let rentedItemsArray = JSON.parse(JSON.stringify(user.rentedItems));
      rentedItemsArray.push(this.dealDetails.itemId);
      user.rentedItems = rentedItemsArray;

      this.$store
        .dispatch({
          type: "updateItem",
          item: item
        })
        .then(() => {
          this.$store
            .dispatch({
              type: "updateUser",
              user: user
            })
            .then(() => {
              this.open = true;
              // console.log(this.open);
            });
        });
    },
    cancel() {
      this.$emit("cancel-deal");
    },
    closeModal() {
      this.open = false;
    }
    // exitFirst() {
    //   this.modal1 = false;
    //   this.firstDay = "";
    // },
    // exitSec() {
    //   this.modal2 = false;
    //   this.lastDay = "";
    // },
    // allowedDates(dateStr) {
    //   // console.log(this.unAvailableDates);

    //   return !this.unAvailableDates.includes(dateStr);
    // },

    // allowedDates(dateStr) {
    //   return !this.$store.getters.selectedItem.occupiedDates.includes(dateStr);
    // },
    // calculateFirstDate() {
    //   var firstDay = this.dealDetails.firstDay || this.today;
    //   var date = new Date(firstDay).getTime() / 1000;
    //   this.firstDateTimeStamp = date;
    //   daysCount();
    // },
    // daysCount() {
    //   var last = this.dealDetails.lastDay || this.dealDetails.firstDay;
    //   var date = new Date(last).getTime() / 1000;
    //   this.dealDetails.daysToRent = (date - this.firstDateTimeStamp)/86400;
    // }
  },
  computed: {
    owner() {
      return this.$store.getters.itemOwner;
    },
    item() {
      return this.$store.getters.selectedItem;
    },
    selectedDateRent() {
      return this.selectedDate || this.today;
    }
    // totalCost() {
    //   return (
    //     this.$store.getters.selectedItem.price * this.dealDetails.daysToRent
    //   );
    // }
  },
  components: {
    // datePicker,
    confirmModal
  }
};
</script>

<style lang="scss" scoped>
.book-page {
  text-align: left;
  // margin: 5px 20px;
  margin: 10px 35px;
}

.main-image {
  max-width: 300px;
  margin: 10px 0px;
}

.btn {
  width: 60%;
  height: 3em;
  font-size: 1.2em;
  color: #f6f6f6;
  border: 0;
  margin: 5px 0px;
  background-color: #3fb67b;
  cursor: pointer;
}

.btn-book {
  background-color: #f56400;
}

.date-picker-schedual {
  background-color: aliceblue;
  z-index: 2;
}
.table {
  height: 115px;
  width: min-content;
}
.v-picker {
  height: 360px;
}
.v-date-picker-table {
  height: 210px;
}

.table-container {
  margin: 10px;
}
</style>
