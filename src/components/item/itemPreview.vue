<template>

    <div class="item-preview" v-if="item">
        <!-- <sign-up-modal v-if="isUserLoggedIn"></sign-up-modal> -->

        <v-card :to="'/item/' + item._id">
            <v-card-media  height="10em" :src="item.images[0]">

                <div class="text-xs-center">
                    <v-btn @click.prevent="addToFavorites" flat icon color="pink" :disabled="dialog" :loading="dialog" class="white--text" @click.stop="dialog = true">
                        <v-icon>favorite</v-icon>
                    </v-btn>
                </div>

                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>


                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-media>
            <v-card-title>
              <div>
                    <h4>{{item.title}}</h4>
                    <p>{{shortDescription}}</p>
                    </div>
                    <div class="flex location">
                        <v-icon small light>fas fa-map-marker-alt</v-icon>
                        <p>Tel Aviv, {{location}} km from you</p>
                    </div>
                    <br>

                    <div class="flex card-bottom">
                        <p class="price bold-font">{{item.price}}$ per day</p>
                        <div v-if="item">

                             <v-icon small light color="yellow">fas fa-star</v-icon>
                            {{avgRank}} ({{item.ranking.count}})
                        </div>
                    </div>

            </v-card-title>

        </v-card>


    </div>

</template>
<script>
import signIn from "../signIn.vue";
export default {
  name: "ItemPreview",
  props: ["item"],
  data() {
    return {
      isUserLoggedIn: false,
      dialog: false
    };
  },
  methods: {
    addToFavorites() {
      // console.log("added to favorites", this.item);
      var currUser = this.$store.getters.loggedinUser;
      if (currUser) {
        this.isUserLoggedIn = true;
        this.$store
          .dispatch({
            type: "addItemToFavorites",
            item: this.item,
            user: currUser
          })
          .then(() => {});
      } else this.showSignIn();
      this.isUserLoggedIn = false;
    },

    showSignIn() {
      this.isUserLoggedIn = false;
      alert("please sign in");
    }
  },

  created() {},

  computed: {
    shortDescription() {
      if (this.item.description.length > 25)
        return this.item.description.substring(0, 25) + "...";
      else return this.item.description;
    },
    avgRank() {
      return this.item.ranking.avg.toFixed(1);
    },

    location() {
      return (Math.random() * (70 - 0) + 0).toFixed(1);
    }
  },

  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 2000);
    }
  },
  components: {
    signIn
  }
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}

.location {
  padding: 10px 0;
}

.card-bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.226);
  justify-content: space-between;
  padding: 5px 0;
}
p {
  margin: 0;
  font-size: 12px;
}

.price {
  color: #42b983;
}
.v-card {
  // margin: 20px 10px 10px 10px;
  max-width: 200px;
  transition: all 0.8s;
}
.v-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.v-icon {
  padding-right: 5px;
}

.v-btn--icon {
  right: 10px;
  transition: all 0.3s;
}

a {
  color: #42b983;
}
.v-card__media {
  height: 16em;
  margin: 0 auto;
  transition: all 0.3s;
}

.v-card__media:hover {
  opacity: 0.8;
}

.v-card__title {
  color: black;
  text-align: left;
  padding: 10px 10px 0 10px;
}

div.v-card__title {
  min-height: 126px !important;
}

</style>
