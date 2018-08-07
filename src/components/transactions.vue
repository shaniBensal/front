<template>
    <div class="orders">
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
                        
                        <p> <v-icon>far fa-handshake </v-icon> Rented from: {{transaction.fromOwner.name}}</p>
                        <p>Email: {{transaction.fromOwner.email}}</p>
                        <p>Day of picking-up: {{transaction.dates[0] |moment("DD/MM/YYYY")}}</p>
                        <p>From: {{transaction.fromOwner.address}}</p>
                    </div>

                   <div class="rank">
                   <star-rating  :star-size="15" @rating-selected="setRating($event,transaction.item)"></star-rating>
                  </div>
                </li>
            </ul>
        </div>
        <hr>
        <div class="passiveTrasactions">
            <h1>Items ordered from me</h1>
            <ul>
                <li v-for="transaction in transactions.passiveTransactions" :key="transaction._id" class="flex" v-if="isFutureDate(transaction.dates[0])" :class="{newTrans:transaction.isNew}">
                    <div>
                        <img :src="transaction.item.images[0]">
                    </div>
                    <div>

                        <h3>{{transaction.item.title}}</h3>
                        <p> price: {{transaction.item.price}}$</p>
                    </div>

                    <div class="details">
                       
                        <p><v-icon>far fa-handshake </v-icon> Orderd from: {{transaction.rentedTo.name}}</p>
                        <p>email: {{transaction.rentedTo.email}}</p> 
                        <p>Day of picking-up: {{transaction.dates[0]}} ({{transaction.dates[0] | moment("from")}})</p>
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
    return {};
  },
  created() {},
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
    // newNotification() {
    //   return this.$store.getters.isNewNote;
    // }
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

li {
  width: 80vw;
  padding: 20px;
  justify-content: space-around;
}

li:nth-child(odd) {
  background-color: #eeeeee;
}

.orders img {
  width: 80px;
}

.newTrans {
  color: red;
}
</style>
