<template>
    <div v-if="selectedDate !==null">
        <h1>Hi</h1>
        You chose to rent 
        <p>From Owner Name </p>
        <p> pickup adress is AAAAAdress</p>
        {{selectedDate}}
        Dates:
        <v-layout wrap>
            <v-layout row wrap class="table">
                <v-flex xs12 sm6 md4>
                    <v-dialog ref="dialog" v-model="modal1" :return-value.sync="date" persistent lazy>
                        <v-text-field slot="activator" v-model="dealDetails.firstDay" label="Start Day" prepend-icon="event"></v-text-field>
                        <v-date-picker v-model="dealDetails.firstDay" class="dates">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="table">
                <v-flex xs12 sm6 md4>
                    <v-dialog ref="dialog" v-model="modal2" :return-value.sync="date" persistent lazy>
                        <v-text-field slot="activator" v-model="dealDetails.lastDate" label="End date" prepend-icon="event"></v-text-field>
                        <v-date-picker v-model="dealDetails.lastDate" class="dates">
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-flex>
            </v-layout>
        </v-layout>

    </div>
</template>
<script>
export default {
  name: "BookItem",
  props: ["selectedDate"],
  data() {
    return {
      modal1: false,
      modal2: false,
      dealDetails: {
        userName: null,
        itemName: null,
        daysToRent: 1,
        firstDay: null,
        lastDay: null,
        ownerName: null,
        totalPrice: null
      }
    };
  },
  created() {
    this.loadItem(this.$route.params.id);
    this.loadFirstData();
  },
  methods: {
    loadItem(itemId) {
      this.$store
        .dispatch({ type: "loadItemById", itemId })
        .then(item => {
          this.loadOwner(item.ownerId);
        })
        .then(_ => loadFirstData());
    },
    loadFirstData() {
      this.dealDetails.itemName = this.selectedItem.title;
      this.dealDetails.firstDay = this.selectedDate||null;
      this.dealDetails.userName = this.$store.getters.loggedinUser.name;
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    itemForDisplay() {
      return this.$store.getters.selectedItem;
    },
    totalCost() {
      return (
        this.$store.getters.selectedItem.price * this.dealDetails.daysToRent
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-book {
  background-color: #f56400;
}

.v-card__text {
  background-color: white;
}

.v-card > :first-child:not(.v-btn):not(.v-chip) {
  background-color: #00d8ae;
}

.v-card > :last-child:not(.v-btn):not(.v-chip) {
  background-color: #00d8ae;
}

.dates {
  background-color: aliceblue;
  z-index: 2;
}
.table {
  height: 115px;
  width: min-content;
}
.v-picker {
  height: 455px;
}
.v-date-picker-table {
  height: 210px;
}
</style>
