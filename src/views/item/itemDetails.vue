<template>
    <section v-if="itemForDisplay">
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
                <sign-up-modal></sign-up-modal>
            </div>
            
        </div>
        <!-- <date-picker :unavailableDates="itemForDisplay.occupiedDates"></date-picker> -->
        Rank our product:
        <star-rating :rating="rating" @rating-selected="setRating"></star-rating>
        <!-- ***************************Add ranking possibility and calculate AVG! -->
        reviews:
    </section>
</template>
<script>
import datePicker from "../../components/datePicker.vue";
import StarRating from "vue-star-rating";
import signUpModal from "../../components/signUpModal.vue";

export default {
  name: "itemDetails",
  data() {
    return {
      rating: 4,
      dialog: false,
      owner: {}
    };
  },
  created() {
    this.loadItem(this.$route.params.id);
  },
  computed: {
    itemForDisplay() {
      return this.$store.getters.selectedItem;
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
    setRating(rating) {
      this.$store.commit({ type: "updateItemRank", rating });
      this.$store.dispatch({ type: "updateItem" });
    },
    loadOwner(ownerId) {
      this.$store
        .dispatch({ type: "loadOwnerById", ownerId })
        .then(owner => (this.owner = owner));
    }
  },

  components: {
    datePicker,
    signUpModal
  }
};
</script>

<style lang="scss" scoped>
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
  padding: 35px;
  flex-direction: column;
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
</style>

