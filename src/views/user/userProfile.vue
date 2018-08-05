<template>

    <div class="user-profile container" v-if="user">
        <div class="user-contact-profile">
            <v-avatar size="120px" color="grey lighten-4">
                <img :src="user.image" alt="avatar">
            </v-avatar>

            <h2>{{user.name}}</h2>
            <h4>{{user.email}}</h4>

        </div>


        <div class="add-item">
            <button class="add">
                <router-link to="/item/edit" title="Add">
                    Add item
                    <v-icon dark>add</v-icon>
                </router-link>
            </button>
        </div>

        <div class="tabs bold-font">
            <ul>
                <button class="tab1" @click="showItemsForRent">My items</button> |
                <button class="tab3" @click="showFavorites">My favorites</button> |
                <button class="tab4" @click="showTrnsactions">My Orders
                    <v-icon class="notification" v-if="isNewNote">fas fa-bell</v-icon>
                </button>
            </ul>

        </div>

        <div class="user-profile-items">
            <ul class="items-list" v-if="itemsToShow && !transactionsState">
                <li v-for="item in itemsToShow" :key="item._id">
                    <item-preview-for-user :item="item" :isEdit="isEditable"></item-preview-for-user>
                </li>
            </ul>
        </div>

        <div class="user-profile-transactions" v-if="transactionsState">
            <transactions :transactions="transactions"></transactions>
        </div>

    </div>

</template>

<script>
import itemList from "../item/itemList.vue";
import itemPreviewForUser from "../../components/item/itemPreviewForUser.vue";
import transactions from "../../components/transactions.vue";
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
      checkNewTrans: false,
      isNewNote: false
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

    showTrnsactions() {
      this.transactionsState = true;
      this.checkNewTrans = true;
      this.isNewNote = false;
      if (!this.isNewNote && this.checkNewTrans) {
        for (let i = 0; i < this.transactions.passiveTransactions.length; i++) {
          var transaction = this.transactions.passiveTransactions;
          if (transaction[i].isNew) {
            transaction[i].isNew = false;
            // console.log("from profile", transaction[i]);
            this.$store
              .dispatch({
                type: "updateTransaction",
                transaction: transaction[i]
              })
              .then(_ =>
                this.$store.commit({
                  type: "setNewNotification",
                  status: false
                })
              );
          }
        }
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


<style scoped>
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
  width: 60%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.tabs ul {
  color: #162044;
  list-style: none;
}
.user-profile-items {
  background-color: rgba(211, 211, 211, 0.692);
}

.user-profile-items ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 200px);
}

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
  width: 30%;
  background-color: #1da088;
  padding: 10px;
  margin: 20px 0;
  text-align: center;
}

.add-item:hover {
  background-color: #00d8ae;
}
</style>
