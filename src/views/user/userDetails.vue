<template>

    <div class="user-details" v-if="userToShow">
        <div class="user-contact-details">
            <v-avatar size="125px" color="grey lighten-4">
                <img :src="user.image" alt="avatar">
            </v-avatar>

            <h2>{{user.name}}</h2>
            <h4>{{user.email}}</h4>
                   
        </div>
                   

        <div class="user-items-details">
            <button class="add">
                      <router-link to="/item/edit" title="Add"> 
                        Add item <v-icon dark>add</v-icon>
                      </router-link> 
                    </button>
            <!-- <h2>Items You Rented</h2>
            <ul>
                <li v-for="item in rentedItems" :key="item._id" v-if="rentedItems">
                   <img :src="item.images[0]">
                </li>
                <h4 v-else>You haven't rent anything yet</h4>
            </ul>
            
        </div> -->
            <v-card flat tile>

                <v-container fluid grid-list-md grey lighten-4>
                    <v-subheader>Items you rented</v-subheader>

                    <v-layout row wrap>
                        <v-spacer></v-spacer>
                        <v-flex v-for="item in rentedItems" :key="item._id" v-if="rentedItems" xs12 sm6 md>
                            <v-card width="100px">
                                <v-card-media :src="item.images[0]" height="100px">
                                </v-card-media>

                                <v-card-actions class="white justify-center">
                                   <!-- <v-btn fab dark large color="cyan">
                                         <v-icon dark>edit</v-icon>
                                     </v-btn> -->
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
            <v-card flat tile>

                <v-container fluid grid-list-md grey lighten-4>
                    <v-subheader>Items you are renting out
                    </v-subheader>

                    <v-layout row wrap>
                        <v-spacer></v-spacer>
                        <v-flex v-for="item in itemsForRent" :key="item._id" v-if="itemsForRent" xs12 sm6 md>
                            <v-card width="120px">
                                <v-card-media :src="item.images[0]" height="100px">
                                </v-card-media>
                                 <v-subheader>{{item.title}}
                                  </v-subheader>  
                                <v-card-actions class="justify-center">
                                    <div class="text-xs-center">
                                       
                                     <v-btn fab dark small color="cyan">
                                         <router-link :to="'/item/edit/'+item._id" title="Edit">
                                         <v-icon dark>edit</v-icon>
                                         </router-link>
                                     </v-btn>
                                  
                                     <v-btn color="red" fab dark small @click="removeItem(item._id)">
                                        <v-icon dark>remove</v-icon>
                                     </v-btn>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>

            <v-card flat tile>

                <v-container fluid grid-list-md grey lighten-4>
                    <v-subheader>Items you liked
                        <v-spacer></v-spacer>
                        <v-icon>fas fa-heart</v-icon>
                    </v-subheader>

                    <v-layout row wrap>
                        <v-spacer></v-spacer>
                        <v-flex v-for="item in favoriteItems" :key="item._id" v-if="favoriteItems" xs12 sm6 md>
                            <v-card width="100px">
                                <v-card-media :src="item.images[0]" height="100px">
                                </v-card-media>
                                 <v-subheader>{{item.title}}
                                   {{item.price}}$
                                  </v-subheader>  

                                <v-card-actions class="white justify-center">
                                    <v-btn class="white--text" fab icon small>...
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userToShow: false
    };
  },

  created() {
    // console.log(this.$route.params.id);
    this.loadUser(this.$route.params.id);
  },

  methods: {
    loadUser(userId) {
      this.$store
        .dispatch({ type: "getUserWithItems", userId: userId })
        .then(() => {
            this.userToShow = true;
            // this.loadRentedItems(user.rentedItems);
            // this.loadItemsForRent(userId);
          }
        );
    },
    // loadRentedItems(items) {
    //   console.log("items user rented: ", items);
    //   this.$store.dispatch({ type: "loadRentedItems", items: items });
    // },
    // loadItemsForRent(userId) {
    //   this.$store.dispatch({ type: "loadItemsForRent", userId: userId });
    // },
    removeItem(itemId) {
      // console.log("removing...", itemId);
      this.$store
        .dispatch({ type: "deleteItem", itemId: itemId })
        .then(() => this.loadUser(this.$route.params.id));
    },
 
  },

  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    rentedItems() {
      return this.$store.getters.rentedItemsByUser;
    },
    itemsForRent() {
      return this.$store.getters.itemsForRent;
    },
    favoriteItems(){
        return this.$store.getters.favoriteItems
    }
  }
};
</script>


<style scoped>
.router-link :active {
  color: #162044;
}

a:active {
  color: #162044;
}

.v-btn__content a {
  text-decoration-line: none;
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
.user-details {
  display: flex;
  justify-content: space-around;
}

.user-contact-details {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
}

.v-avatar {
  align-self: center;
}

.v-card {
  justify-content: center;
  margin: 10px 0;
}

.v-card__media {
  cursor: pointer;
}
.user-items-details {
  display: flex;
  flex-direction: column;
}

.user-items-details ul {
  display: flex;
  list-style: none;
  width: 50%;
}

.user-items-details img {
  width: 150px;
}

.add {
  width: 100%;
  background-color: #00d8ae;
  margin: 20px 0;
  max-width: 470px;
}
</style>
