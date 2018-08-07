<template>

    <div class="item-preview" v-if="item">
        <!-- <sign-up-modal v-if="isUserLoggedIn"></sign-up-modal> -->

        <v-card :to="'/item/' + item._id">
            <v-card-media  :src="item.images[0]">

                <div class="text-xs-center">
                    <v-btn @click.prevent="addToFavorites" flat icon color="pink lighten-1" :disabled="dialog" :loading="dialog" class="white--text like" @click.stop="dialog = true">
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
                    <div class="flex location" v-if="owner.address">
                        <v-icon small light>fas fa-map-marker-alt</v-icon>
                        <p >{{owner.address}} <br> <span>{{distance}} km </span>from you</p>
                    </div>
                    <div class="flex location" v-else>
                        <v-icon small light>fas fa-map-marker-alt</v-icon>
                        <p >No location found</p>
                    </div>
                    <br>

                    <div class="flex card-bottom">
                        <p class="price bold-font">{{item.price}}$ per day</p>
                        <div v-if="item">

                             <v-icon small light color="yellow">fas fa-star</v-icon>
                          <span class="rank"> {{avgRank}} ({{item.ranking.count}}) </span>
                        </div>
                    </div>

            </v-card-title>

        </v-card>


    </div>

</template>
<script>
import signIn from "../signIn.vue";
import mapService from "../../services/mapService.js";
export default {
  name: "ItemPreview",
  props: ["item"],
  data() {
    return {
      isUserLoggedIn: false,
      dialog: false,
      owner: {},
      itemLocation: {},
      userLocation: {},
      distance: null
    };
  },
  methods: {
    addToFavorites() {
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
    },
    loadOwner(ownerId) {
      return this.$store
        .dispatch({ type: "loadOwnerById", ownerId })
        .then(owner => {
          this.owner = owner;
        });
    },
    geolocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve();
        });
      });
    },
    getItemLocation(ownerAddress) {
      return mapService.getUserLatLng(ownerAddress).then(itemLocation => {
        this.itemLocation = itemLocation;
      });
    },

    calcDistance() {
      var coords = {
        lat1: this.itemLocation.lat,
        lng1: this.itemLocation.lng,
        lat2: this.userLocation.lat,
        lng2: this.userLocation.lng
      };

      var distance = mapService.calcDistanceFromLatLngInKm(coords);
      this.distance = distance.toFixed(1);
      this.$emit('getDistance' ,this.distance );
      
    }
  },

  created() {
    this.loadOwner(this.item.ownerId)
      .then(() => {
        var userLocPrm = this.geolocation();
        var itemLocPrm = this.getItemLocation(this.owner.address);
        return Promise.all([userLocPrm, itemLocPrm]);
      })
      .then(this.calcDistance);
  },

  computed: {
    shortDescription() {
      if (this.item.description.length > 25)
        return this.item.description.substring(0, 20) + "...";
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

.rank{
  font-size: 12px;
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
  font-weight: bold;
  font-size: 15px;
}
.v-card {
  // margin: 20px 10px 10px 10px;
  // max-width: 200px;
  transition: all 0.8s;
}
.v-card:hover {
  // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.v-icon {
  padding-right: 5px;
}

.like{
  right: 10px;
  transition: all 0.3s;
}

a {
  color: #42b983;
}
.v-card__media {
  
  height: 7em;
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
  transition: 0.3s;
}

.v-card__title:hover {
  color: #42b983;
}

div.v-card__title {
  min-height: 126px !important;
}

.item-preview {
  text-transform: capitalize;
}

.location span {
  font-weight : bold;
}


// .v-card-media {
//   height : 8em !important;
// } 

div .v-card__media {
  height: 10em !important;
} 

@media (max-width: 440px) {
  div .v-card__media {
  height: 30vh !important;
  } 
}
</style>
