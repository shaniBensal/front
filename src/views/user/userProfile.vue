<template>

    <div class="user-profile container" v-if="user">
        <div class="user-contact-profile">
            <v-avatar size="120px" color="grey lighten-4">
                <img :src="user.image" alt="avatar">
            </v-avatar>
            <h2>{{user.name}}</h2>
            <h4>{{user.email}}</h4>
        </div>
        <button class="add-item">
            <router-link to="/item/edit" title="Add">
                <v-icon dark>add</v-icon>
            </router-link>
        </button>
        <div class="tabs bold-font">
            <ul class="tabs-buttons">
                <button class="tab1" @click="showItemsForRent">My items</button> |
                <button class="tab3" @click="showFavorites">My favorites</button> |
                <button class="tab4" @click="showUserTrnsactions">My Orders
                    <v-badge overlap color="red" v-if="isNewNote">
                        <v-icon slot="badge" dark small>notifications</v-icon>
                    </v-badge>
                </button>
            </ul>
            <v-select class="tabs-switch" @change="switchDisplay" :items="itemsForDisplay" outline></v-select>
        </div>

        <div class="user-profile-items">
            <ul class="items-list" v-if="itemsToShow && !transactionsState">
                <li v-for="item in itemsToShow" :key="item._id">
                    <item-preview-for-user :item="item" :isEdit="isEditable"></item-preview-for-user>
                </li>
            </ul>
        </div>

        <div class="user-profile-transactions" v-if="transactionsState">
            <transactions :transactions="transactions" @orders-checked="ordersChecked"></transactions>
        </div>
    </div>

</template>

<script>
import itemList from "../item/itemList.vue";
import itemPreviewForUser from "../../components/item/itemPreviewForUser.vue";
import transactions from "../../components/transactions.vue";
import eventBus, { MESSAGES_READ } from "../../services/EventBusService.js";
export default {
  data() {
    return {
      user: null,
      userAndItems: null,
      itemsToShow: [],
      isEditable: true,
      transactionsState: false,
      transactions: {
        passiveTransactions: [],
        activeTransactions: []
      },
      favoriteItems: [],
      checkOrders: false,
      isNewNote: false,
      itemsForDisplay: ["All", "Favorites", "Orders"]
    };
  },

  created() {
    this.loadUser(this.$route.params.id);
  },

  methods: {
    // loadUser(userId) {
    //   this.$store
    //     .dispatch({ type: "getUserWithItems", userId: userId })
    //     .then(currUser => {
    //       // console.log(currUser);
    //       this.user = currUser.user;
    //       this.userAndItems = currUser;
    //       this.itemsToShow = currUser.owendItems;
    //     });
    // },

    loadUser(userId) {
      this.user = { ...this.$store.getters.loggedinUser };
      this.$store
        .dispatch({ type: "getTransactionsByOwner", userId })
        .then(transactions => {
          this.transactions.passiveTransactions = transactions;
          this.$store
            .dispatch({ type: "getTransactionsByRenter", userId })
            .then(transactions => {
              this.transactions.activeTransactions = transactions;
              this.$store
                .dispatch({ type: "getUserWithItems", userId: userId })
                .then(currUser => {
                  this.user = currUser.user;
                  this.userAndItems = currUser;
                  this.itemsToShow = currUser.owendItems;
                  this.isNewNote = this.$store.getters.isNewNote;
                });
            });
        });
    },
    removeItem(itemId) {
      // console.log("removing...", itemId);
      this.$store
        .dispatch({ type: "deleteItem", itemId: itemId })
        .then(() => this.loadUser(this.$route.params.id));
    },
    showItemsForRent() {
      this.itemsToShow = this.userAndItems.owendItems;
      this.isEditable = true;
      this.transactionsState = false;
    },
    showItemsRented() {
      this.itemsToShow = this.userAndItems.rentedItems;
      this.isEditable = false;
      this.transactionsState = false;
    },
    showFavorites() {
      this.itemsToShow = this.userAndItems.favoriteItems;
      this.isEditable = false;
      this.transactionsState = false;
    },
    showUserTrnsactions() {
      this.transactionsState = true;
    },
    ordersChecked() {
      this.checkOrders = true;
      if (this.isNewNote) {
        this.transactions.passiveTransactions.forEach(transaction => {
          if (transaction.isNew) {
            this.$store.dispatch({
              type: "updateTransaction",
              transaction: transaction
            });
          }
        });
        this.isNewNote = false;
        this.loadUser(this.$route.params.id);
        this.$store.commit({
          type: "setNewNotification",
          status: false
        });
        eventBus.$emit(MESSAGES_READ);
      }
    },
    switchDisplay(value) {
      switch (value) {
        case "All":
          this.showItemsForRent();
          break;
        case "Favorites":
          this.showFavorites();
          break;
        case "Orders":
          this.showUserTrnsactions();
          break;
      }
    }
  },
  computed: {
    // user(){
    //   return this.$store.getters.loggedinUser
    // }
  },
  components: {
    itemList,
    itemPreviewForUser,
    transactions
  }
};
</script>


<style scoped lang="scss">
.container {
  max-width: 980px;
}

button a {
  color: white;
}

.router-link :active {
  color: white;
}

a:active {
  color: white;
}

.tabs {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.tabs ul {
  color: #162044;
  list-style: none;
}

.tabs-switch {
  display: none;
  border: 1px black solid;
}
.user-profile-items {
  background-color: rgba(211, 211, 211, 0.692);
}

.user-profile-items ul {
  list-style-type: none;
  padding: 20px;
  display: grid;
  justify-content: space-evenly;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 200px);
}

/* .user-profile-items li{
  justify-items: center;

} */

.tabs button {
  margin: 0 10px;
}

.tabs button:focus {
  border-bottom: 1px solid #00d8ae;
  outline: none;
}
.tabs button:hover {
  background-color: rgba(211, 211, 211, 0.466);
}
.user-profile-items {
  width: 100%;
}

button a {
  text-decoration-line: none;
}
.v-icon {
  text-decoration-line: none;
}

.material-icons {
  display: flex;
}
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-contact-profile {
  display: flex;
  flex-direction: column;
  position: relative;
}

.v-avatar {
  align-self: center;
}

.v-avatar img {
  object-fit: cover;
}

.add-item {
  background-color: #1da088;
  padding: 10px;
  margin: 20px 0;
  text-align: center;
  border-radius: 20px;
}

.add-item:hover {
  background-color: #00d8ae;
}

.v-badge {
  top: -22px;
}
input,
select {
  border-bottom: 1px solid black;
  width: 50%;
  padding: 5px;
}
@media (max-width: 440px) {
  .user-profile-items {
  grid-template-columns: repeat(auto-fill, 80%);
  padding: 20px 0px;
  }
  .tabs-buttons {
    display: none;
  }
  .tabs-switch {
    display: inline;
  }
}
</style>




