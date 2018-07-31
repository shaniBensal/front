<template>
    <section v-if="itemForDisplay">
      <book-item v-if="isBooked" :selectedDate="selectedDate||null" :unAvailableDates="itemForDisplay.occupiedDates"></book-item>
      <div v-else>
        <div class="main-container d-inline-flex">
            <div class="carousel">
                <v-carousel>
                    <v-carousel-item v-for="(item,i) in itemForDisplay.images" :key="i" :src="itemForDisplay.images[i]">
                    </v-carousel-item>
                </v-carousel>
            </div>
            <div class="item-details d-inline-flex">
                <h1> {{itemForDisplay.title}} ⭐⭐⭐⭐</h1>
                <div class="owner-pic"></div>
                <label v-if="owner">{{owner.name}}</label>
                <span>Price: {{itemForDisplay.price}} </span>
                <div>pick up from: Tel Aviv (2Km from you)</div>
                Description:
                <p>{{itemForDisplay.description}}</p>
                <div class="text-xs-center">
                </div>
                <sign-up-modal v-if="!user"></sign-up-modal>
                <div v-else><v-btn class="btn-book" @click="bookNow">Book Now</v-btn></div>
                <!-- <book-item-modal v-else :selectedDate="selectedDate"></book-item-modal> -->
                {{selectedDate}}
            </div>
        </div>
        <date-picker @selected-date="selectDate" v-if="itemForDisplay" :unAvailableDates="itemForDisplay.occupiedDates"></date-picker>
        Rank our product:
        <star-rating :rating="rating" @rating-selected="setRating"></star-rating>
        reviews:
</div>
    </section>
</template>
<script>
import datePicker from "../../components/datePicker.vue";
import bookItem from "../../components/bookItem.vue";
import StarRating from "vue-star-rating";
import signUpModal from "../../components/signUpModal.vue";

export default {
  name: "itemDetails",
  data() {
    return {
      isBooked: false,
      rating: 4,
      dialog: false,
      owner: {},
      selectedDate: ""
    };
  },
  created() {
    this.loadItem(this.$route.params.id);
  },
  computed: {
    itemForDisplay() {
      return this.$store.getters.selectedItem;
    },
    user() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    loadItem(itemId) {
      this.$store.dispatch({ type: "loadItemById", itemId }).then(item => {
        this.loadOwner(item.ownerId);
      });
    },
    goBackToList() {
      this.$router.push("/app");
      this.$store.commit({ type: "unSetItem" });
    },
    selectDate(date) {
      this.selectedDate = date;
    },
    setRating(rating) {
      this.$store.commit({ type: "updateItemRank", rating });
      this.$store.dispatch({ type: "updateItem" });
    },
    loadOwner(ownerId) {
      this.$store
        .dispatch({ type: "loadUserById", ownerId })
        .then(owner => (this.owner = owner));
    },
    bookNow() {
      this.isBooked = true;
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

.bold-font{
font-family: 'Roboto Slab-bold', serif;
}

.main-container {
  width: 100%;
  margin: 20px;
  font-family: "Roboto Slab";
}
.carousel {
  margin: 0px 10px;
  width: 50%;
}

.item-details {
  padding: 20px 35px;
  flex-direction: column;
  text-align: left;
  width: 50%;
  align-items: end;
}
.owner-pic {
  width: 50px;
  border-radius: 20px;
  background-image: url("../../assets/img/logo.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

.btn-book {
  background-color: #f56400;
}
</style>

