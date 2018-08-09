<template>
    <div class="orders">
      <div class="passiveTrasactions">
            <h1>Items ordered from me</h1>
            <ul>
                <li v-for="transaction in transactions.passiveTransactions" :key="transaction._id" class="flex" v-if="isFutureDate(transaction.dates[0])"
                    :class="{newTrans:(transaction.isNew && newNotification)}">
                    <div class="img-item">
                        <img :src="transaction.item.images[0]">
                    </div>
                    <div>
                        <h3>{{transaction.item.title}}</h3>
                        <p> price: {{transaction.item.price}}$</p>
                    </div>
                    <div class="details">
                        <p>
                            <v-icon>far fa-handshake </v-icon> Orderd from: {{transaction.rentedTo.name}}</p>
                        <p>email: {{transaction.rentedTo.email}}</p>
                        <p>Day of picking-up: {{transaction.dates[0]}} ({{transaction.dates[0] | moment("from")}})</p>
                    </div>
                    <div class= "img-new" v-if="transaction.isNew && newNotification">
                      <img src="https://www.getgeared.co.uk/shopflow/img/badges/newItemBadge.png">
                        </div>
                </li>
            </ul>
        </div>
                <hr>
        <h1>Items I ordered</h1>
        <div class="activeTrasactions">
            <ul>
                <li v-for="transaction in transactions.activeTransactions" :key="transaction._id" class="flex">
                    <div>
                        <img :src="transaction.item.images[0]">
                    </div>
                    <div>
                        <h3>{{transaction.item.title}}</h3>
                        <p> price: {{transaction.item.price}}$</p>
                    </div>
                    <div class="details">
                        <p>
                            <v-icon>far fa-handshake </v-icon> Rented from: {{transaction.fromOwner.name}}</p>
                        <p>Email: {{transaction.fromOwner.email}}</p>
                        <p>Day of picking-up: {{transaction.dates[0] |moment("DD/MM/YYYY")}}</p>
                        <p>From: {{transaction.fromOwner.address}}</p>
                    </div>

                    <div class="rank">
                        <star-rating :star-size="15" @rating-selected="setRating($event,transaction.item)"></star-rating>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  props: ["transactions"],
  data() {
    return {
      newNotification: null
    };
  },
  created() {
    this.newNotification = this.$store.getters.isNewNote;
    this.$emit("orders-checked");
  },
  methods: {
    isFutureDate(date) {
      var rentingDate = new Date(date);
      var dayAheadTimeStamp = Date.now() + 24 * 60 * 60 * 1000;
      if (+rentingDate > dayAheadTimeStamp) return true;
      return false;
    },

    setRating(rating, item) {
      item.ranking.totalRank += rating;
      this.$store
        .dispatch({ type: "updateItemWithRank", rating, item })
        .then(item => console.log("item updated", item));
    }
  },
  computed: {
    rating() {
      return Math.random() * (5 - 1 + 1) + 1;
    }
  }
};
</script>

<style scoped>
body {
  text-transform: capitalize;
}
.flex {
  display: flex;
}
h1 {
  padding: 20px;
  text-align: left;
}

hr {
  margin-top: 25px;
}

li {
  width: 80vw;
  padding: 20px;
  justify-content: space-around;
  text-align: left;
}

li:nth-child(odd) {
  background-color: #eeeeee;
}

.orders img {
  width: 80px;
}

.img-new {
  position: relative;
  bottom: 21px;
  left: 22px;
  height: max-content;
}

.img-item{
  padding-right: 20px;
}

</style>
