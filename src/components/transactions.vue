<template>
    <div class="orders">
           <h1>Items i orderd</h1>
        <div class="activeTrasactions">
         
            <ul>
                <li v-for="transaction in transactions.activeTransactions" :key="transaction._id" class="flex">
                    <div>
                        <img :src="transaction.item.images[0]">
                    </div>
                    <div>

                         <h3>{{transaction.item.title}}</h3>
                         <p>{{transaction.item.description}}</p>
                    </div>

                    <div>
                        orderd from: {{transaction.fromOwner.name}}
                        day of picking-up: {{transaction.dates[0]}}
                        from: {{transaction.fromOwner.address}}
                    </div>
                   
                    
                </li>
            </ul>

        </div>
         <div class="passiveTrasactions">
            <h1>Items orderd from me</h1>
                     <ul>
                <li v-for="transaction in transactions.passiveTransactions" :key="transaction._id" v-if="isFutureDate(transaction.dates[0])">{{transaction.dates[0]}} ({{transaction.dates[0] | moment("from")}})
                    <div>
                        <img :src="transaction.item.images[0]">
                    </div>
                    <div>

                         <h3>{{transaction.item.title}}</h3>
                    </div>

                    <div>
                        orderd from: {{transaction.rentedTo.name}}
                        email:{{transaction.rentedTo.email}}
                    </div>
                </li>
            </ul>


        </div>
    </div>
</template>

<script>
export default {
  props: ["transactions"],

  methods: {
    isFutureDate(date) {
      var rentingDate = new Date(date);
      var dayAheadTimeStamp = Date.now() + 24 * 60 * 60 * 1000;
      if (+rentingDate > dayAheadTimeStamp) return true;
      return false;
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}

li:even {
  background-color: #eeeeee;
}

.orders img {
  width: 80px;
}
</style>
