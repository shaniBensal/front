<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent>
            <v-btn class="btn-book" slot="activator">Book Now!</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline"> {{user.name}} Great choice
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <div>Total Cost: {{totalCost}}</div>
                        <v-layout wrap>
                            <v-layout row wrap class="table">
                                <v-flex xs12 sm6 md4>
                                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy>
                                        <v-text-field slot="activator" v-model="firstDay" label="Start Day" prepend-icon="event"></v-text-field>
                                        <v-date-picker v-model="firstDay" class="dates">
                                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap class="table">
                                <v-flex xs12 sm6 md4>
                                    <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy>
                                        <v-text-field slot="activator" v-model="lastDate" label="End date" prepend-icon="event"></v-text-field>
                                        <v-date-picker v-model="lastDate" class="dates">
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                            </v-layout>
                        </v-layout>
<v-flex xs12>
                                <v-text-field v-model="user.email" label="Email" required></v-text-field>
                            </v-flex>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <!-- <v-btn color="blue darken-1" flat @click.native="saveNewUser">Save</v-btn> -->
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
export default {
  name: "BookItemModal",
  props: ["selectedDate"],
  data() {
    return {
      dialog: false,
      modal: false,
      dealDetails: {
        date: null,
        daysToRent: 2,
        firstDay: null,
        lastDate: null
      }

      //   user: {
      //     name: "",
      //     email: "",
      //     password: "",
      //     address: ""
      //     // image:''
      //   }
    };
  },
  created() {
    this.firstDay = this.selectedDate;
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    itemForDisplay() {
      return this.$store.getters.selectedItem;
    },
    totalCost() {
      return this.$store.getters.selectedItem.price * this.daysToRent;
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
}
.v-picker {
  height: 455px;
}
.v-date-picker-table {
  height: 210px;
}
</style>
