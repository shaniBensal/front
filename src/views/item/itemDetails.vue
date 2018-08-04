<template>
    <section v-if="itemForDisplay">
        <book-item @cancel-deal="cancelDeal" v-if="isBooked" :selectedDate="selectedDate||null"></book-item>
        <div v-else class="main-container d-inline-flex">
                <div class="item-details d-flex">
                    <div>
                        <h1 class="bold-font"> {{itemForDisplay.title}} ⭐{{itemForDisplay.ranking? itemForDisplay.ranking.count : ''}}</h1>
                        <span class="bold-font">{{itemForDisplay.price}}$ For day </span>
                    </div>
                    <div class="spacer-paragrph">
                        <div class="owner-pic" :style="{backgroundImage: `url(${owner.image})`}"></div>
                        <label v-if="owner">{{owner.name}} </label>
                        <a class="bold-font">Contat seller</a>
                    </div>
                    <div class="spacer-paragrph" v-if="distance">
                        <i class="fas fa-map-marker-alt"></i> Pick up from: <br>
                        {{owner.address}} ( {{distance}} Km from you) 
                    </div>
                    <p>Description: {{itemForDisplay.description}}</p>
                    <div class="d-flex flex-column" v-if="itemForDisplay.images">
                        <img class="main-image" :src="mainImage">
                        <div class="spacer-paragrph"></div>
                        <div class="image-gallery d-flex">
                        <div v-if="(itemForDisplay.images).length > 1" v-for="(image,idx) in itemForDisplay.images" :key="idx" class="small-image">
                            <img class="thumb-photo" :src="image" @click="switchMainImg(idx)">
                            <span class="bold-font">{{itemForDisplay.price}}$ Per Day </span>
                        </div>
                        <hr>
                        
                        <div class="spacer-paragrph">
                            <div>Item Owner:</div>
                            <div class="owner-pic" :style="{backgroundImage: `url(${owner.image})`}"></div>
                            <div v-if="owner">{{owner.name}} </div>
                        </div>
                        <v-btn class="btn-chat">Start Chat</v-btn>
                        <div class="spacer-paragrph" v-if="distance">
                            <br>
                            <i class="fas fa-map-marker-alt"></i> Pick up from:
                            <br> {{owner.address}}
                            <br>( {{distance}} km from you)
                        </div>
                    </div>
                    
                    <div class="spacer-paragrph">
                        <div class="show-map">
                            <GmapMap ref="mapRef" :center="{lat:currentLocation.lat, lng:currentLocation.lng}" :zoom="14" map-type-id="roadmap" style="width: 300px; height: 200px">
                                <GmapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position" :clickable="true" :draggable="true"
                                    :icon="marker.icon" />
                            </GmapMap>
                        </div>
                    </div>
                <div class="rank-stars">
                  Rate product:
                  <star-rating :rating="rating" star-size="25" @rating-selected="setRating"></star-rating>
                  <br>
                  Reviews:
                </div>
                </div>
            </div>
            <div class="date-book">
                <div>
                    <i class="far fa-calendar-alt"></i> Availability:</div>
                <date-picker class="spacer-right" @selected-date="selectDate" v-if="itemForDisplay" :unAvailableDates="itemForDisplay.occupiedDates"></date-picker>
                <sign-up-modal v-if="!user" @signedUp="bookNow"></sign-up-modal>
                <div v-else>
                    <v-btn class="btn-book bold-font" @click="bookNow">Book Now</v-btn>
                </div>
            </div>
        </div>

    </section>
</template>
<script>
import datePicker from "../../components/datePicker.vue";
import bookItem from "../../components/bookItem.vue";
import StarRating from "vue-star-rating";
import signUpModal from "../../components/signUpModal.vue";
import { gmapApi } from "vue2-google-maps";
import mapService from "../../services/mapService.js";

export default {
  name: "itemDetails",
  data() {
    return {
      isBooked: false,
      rating: 4,
      dialog: false,
      owner: {},
      selectedDate: "",
      // selectedEndDate:"",
      distance: null,
      images: [],
      mainImage: "",
      currentLocation: { lat: 0, lng: 0 },
      markers: [{ position: { lat: 0, lng: 0 }, icon:"/img/marker.png" }]

    };
  },
  created() {
    this.loadItem(this.$route.params.id)
      .then(() => {
        var userLocPrm = this.geolocation();
        var itemLocPrm = this.getItemLocation(this.owner.address);
        return Promise.all([userLocPrm, itemLocPrm])
      })
      .then(this.calcDistance);
  },
  computed: {
    itemForDisplay() {
      return this.$store.getters.selectedItem;
    },
    user() {
      return this.$store.getters.loggedinUser;
    },
    google: gmapApi
  },
  mounted() {

  },

  methods: {
    loadItem(itemId) {
      return this.$store
        .dispatch({ type: "loadItemById", itemId })
        .then(item => {
          this.images = item.images;
          this.mainImage = item.images[0];
          return this.loadOwner(item.ownerId);
        });
    },
    switchMainImg(idx) {
      this.mainImage = this.images[idx];
    },
    goBackToList() {
      this.$router.push("/app");
      this.$store.commit({ type: "unSetItem" });
    },
    cancelDeal() {
      this.isBooked = false;
    },
    selectFirstDate(date) {
      this.selectedStartDate = date;
    },
    setRating(rating) {
      this.$store.commit({ type: "updateItemRank", rating });
      this.$store.dispatch({ type: "updateItem" });
    },
    loadOwner(ownerId) {
      return this.$store
        .dispatch({ type: "loadOwnerById", ownerId })
        .then(owner => {
          this.owner = owner
        });
    },
    bookNow() {
      this.isBooked = true;
    },
    selectDate(date) {
      this.selectedDate = date;
    },

    geolocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
          // console.log('position is' , position)
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.markers[0].position = this.currentLocation;
          resolve();
        });
      });
    },

    getItemLocation(ownerAddress) {
      return mapService.getUserLatLng(ownerAddress).then(itemLocation => {
        this.markers.push({ position: itemLocation });
      });
    },

    calcDistance() {
      var coords = {
        lat1: this.markers[0].position.lat,
        lng1: this.markers[0].position.lng,
        lat2: this.markers[1].position.lat,
        lng2: this.markers[1].position.lng
      };

      var distance = mapService.calcDistanceFromLatLngInKm(coords);
      this.distance = distance.toFixed(2)
    }
  },

  components: {
    datePicker,
    signUpModal,
    bookItem
  }
};
</script>

<style lang="scss" scoped>

.date-book {
  width: 40%;
  height: fit-content;
  position: sticky;
  top: 10px;
}

.main-container {
  min-width: 80vw;
  margin: 20px;
  // font-family: "Roboto Slab";
}
.carousel {
  margin: 0px 10px;
  width: 30%;
}

.main-image {
  max-width: 240px;
}

.small-image {
  width: max-content;
}

.item-details {
  padding: 0px 0px 0px 0px;
  flex-direction: column;
  text-align: left;
  width: 40%;
  align-items: center;
  color: black;
}

.spacer-paragrph {
  margin: 18px 0px;
}
.owner-pic {
  width: 90px;
  height: 90px;
  border-radius: 10%;
  background-image: url("../../assets/img/logo.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.spacer-right {
  margin: 0px 10px;
}

.thumb-photo {
  width: 80px;
  margin: 10px;
  cursor: pointer;
}

.show-map {
  display: flex;
  justify-content: center;
}

.btn-book {
  background-color: #0fa086;
  margin-top: 15px;
  box-shadow: none;
  color: #fff;
}

.btn-chat {
  margin: 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 1.2rem;
  text-transform: capitalize;
}

h1 {
  font-size: 1.8rem;
}
</style>

