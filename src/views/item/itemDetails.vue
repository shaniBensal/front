<template>
    <section v-if="itemForDisplay">
        <book-item @cancel-deal="cancelDeal" v-if="isBooked" :selectedDate="selectedDate||null"></book-item>
        <div v-else class="main-container d-inline-flex">
                <div class="item-details d-flex">
                  <div class="header">
                    <div>
                        <h1 class="bold-font"> {{itemForDisplay.title}}</h1>
                        <span><v-icon color="yellow">fas fa-star</v-icon>{{itemForDisplay.ranking? itemForDisplay.ranking.avg : ''}} ({{itemForDisplay.ranking? itemForDisplay.ranking.count : ''}}) </span>
                        </div>
                      <div class="seller-details">
                        <div class="owner-pic" :style="{backgroundImage: `url(${owner.image})`}"></div>
                        <label v-if="owner">{{owner.name}} </label>
                        <a class="bold-font"><i class="far fa-comments"></i></a>
                      </div>
                           
                    
                    </div>

                        <span class="bold-font">
                         <i class="fas fa-dollar-sign"></i>
                          {{itemForDisplay.price}}$ per day </span>
                           <div class="spacer-paragrph"></div>
                          <p class="show-calender" @click="showCalender"><i class="fas fa-calendar-alt"></i>Check Availability</p>
                        <div class="spacer-paragrph"></div>
                         <p> <i class="fas fa-info"></i>{{itemForDisplay.description}}</p>
                
                   
                    <div class="spacer-paragrph"> </div>
                    <div class="spacer-paragrph"> </div>

                    <div class="d-flex flex-column" v-if="itemForDisplay.images">
                        <img class="main-image" :src="mainImage">
                        <div class="spacer-paragrph"></div>
                        <div class="image-gallery d-flex">
                        <div v-if="(itemForDisplay.images).length > 1" v-for="(image,idx) in itemForDisplay.images" :key="idx" class="small-image">
                            <img class="thumb-photo" :src="image" @click="switchMainImg(idx)">
                        </div>
                        <hr>
                        
                        <div class="spacer-paragrph">
                        </div>
                        <!-- <v-btn class="btn-chat">Start Chat</v-btn> -->
                        </div> 
                    </div>
                        <div class="spacer-paragrph" v-if="distance">
                        <i class="fas fa-map-marker-alt"></i> Pick up from: <br>
                        {{owner.address}} ( {{distance}} Km from you) 
                    </div>
                    <div class="spacer-paragrph">
                        <div class="show-map">
                            <GmapMap ref="mapRef" :center="{lat:currentLocation.lat, lng:currentLocation.lng}" :zoom="13" map-type-id="roadmap" style="width: 400px; height: 300px">
                                <GmapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position" :clickable="true" :draggable="true"
                                    :icon="marker.icon" />
                            </GmapMap>
                        </div>
                    </div>
                 <!-- <div class="rank-stars">
                  Rate product:
                 <star-rating :rating="rating" :star-size="25" @rating-selected="setRating"></star-rating> 
                  <br>
                  Reviews:
                </div> -->
                <!-- </div> -->
            </div> 
            <div class="date-book" :class="{show: showDates}">
                    <i class="far fa-calendar-alt"></i> Availability:
                <div class="calender">
                <date-picker class="spacer-right" @selected-date="selectDate" v-if="itemForDisplay" :unAvailableDates="itemForDisplay.occupiedDates"></date-picker>
                </div>
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
      // rating: 4,
      dialog: false,
      owner: {},
      selectedDate: "",
      showDates: false,
      // selectedEndDate:"",
      distance: null,
      images: [],
      mainImage: "",
      currentLocation: { lat: 0, lng: 0 },
      markers: [{ position: { lat: 0, lng: 0 }, icon: "/img/marker.png" }]
    };
  },
  created() {
    this.loadItem(this.$route.params.id)
      .then(() => {
        var userLocPrm = this.geolocation();
        var itemLocPrm = this.getItemLocation(this.owner.address);
        return Promise.all([userLocPrm, itemLocPrm]);
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
  mounted() {},

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
          this.owner = owner;
        });
    },
    bookNow() {
      this.isBooked = true;
    },
    selectDate(date) {
      this.selectedDate = date;
    },

    showCalender() {
      console.log(this.showDates);
      this.showDates = !this.showDates;
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
      this.distance = distance.toFixed(2);
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
.header {
  display: flex;
  width: 450px;
  justify-content: space-between;
}

.show-calender {
  display: none;
}

// .seller-details {
// }
.date-book {
  width: 0%;
  height: fit-content;
  position: sticky;
  top: 10px;
  padding: 20px;
  transition: all 0.3s ease-in;
  // transform: translateX();
}

.main-container {
  min-width: 80vw;
  margin: 20px;
  // font-family: "Roboto Slab";
}

.main-image {
  max-width: 380px;
}

.small-image {
  width: max-content;
}

.item-details {
  padding: 20px 20px;
  flex-direction: column;
  text-align: left;
  width: 40%;
  color: black;
  align-items: flex-start;
  border: 1px solid #00000017;
}

.image-gallery {
  align-items: center;
}

.image-gallery img {
  border: 1px solid black;
  border-radius: 10px;
}

.spacer-paragrph {
  margin: 18px 0px;
}
.owner-pic {
  width: 50px;
  height: 50px;
  border-radius: 20%;
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
  margin-top: 25px;
  box-shadow: none;
  color: #fff;
  width: 290px;
}

.btn-chat {
  margin: 0;
}

h1 {
  font-size: 1.8rem;
}

i {
  padding-right: 10px;
  cursor: pointer;
}

@media (max-width: 940px) {
  .main-container {
    min-width: 50vw;
    flex-direction: column;
  }

  .show-calender {
    display: block;
    cursor: pointer;
  }

  .show-calender:hover {
    color: #0fa086;
  }
  .date-book {
    width: 95%;
    position: absolute;
    top: 256px;
    display: none;
    background: lightgray;
  }

  .item-details {
    width: 100%;
  }

  .show {
    display: block;
  }

  // .calender {
  //   background: #828a95a3;
  //   width: max-content;
  //   padding-bottom: 10px;
  // }
}

@media (max-width: 500px) {
  // .main-container {
  //   max-width: 40vw;
  //   flex-direction: column;
  // }

  // .show-calender {
  //   display: block;
  // }
  .date-book {
    width: 100%;
    top: 280px;
  }

  // .item-details {
  //   width: 100%;
  // }
  .item-details {
    width: 100%;
  }

  .main-image {
    max-width: 300px;
  }

  .header {
    width: 255px;
  }
  .vue-map-container {
    width: 300px !important;
    height: 300px !important;
  }
  // .calender {
  //   background: #828a95a3;
  //   width: max-content;
  //   padding-bottom: 10px;
  // }
}
</style>

