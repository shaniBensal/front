<template>
    <section v-if="itemForDisplay">
        <!-- <button @click="goBackToList">back</button> -->
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
                <label>{{itemForDisplay.ownerId}}</label>
                <span>Price: {{itemForDisplay.price}} </span>
                <div>pick up from: Tel Aviv (2Km from you)</div> 
                Description:
                <p>{{itemForDisplay.description}}</p>
                <div class="text-xs-center">
                    <v-btn class="btn-book" small>Book Now</v-btn>
                </div>
            </div>
        </div>
        <date-picker :unavailableDates="itemForDisplay.occupiedDates"></date-picker>
        {{itemForDisplay.occupiedDates}}
        reviews:
    </section>
</template>
<script>
import datePicker from "../../components/datePicker.vue";
export default {
  name: "itemDetails",
  data() {
    return {};
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
      this.$store.dispatch({ type: "loadItemById", itemId });
    },
    goBackToList() {
      this.$router.push("/app");
      this.$store.commit({ type: "unSetItem" });
    }
  },

  components: {
    datePicker
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
  width: 10%;
}

.item-details {
  padding: 35px;
  flex-direction: column;
  // padding-left: 5px;
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

