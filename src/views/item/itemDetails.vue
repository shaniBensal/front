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
                <h1> {{itemForDisplay.title}}</h1>

                <div>
                    Price: {{itemForDisplay.price}}
                    <span> pick up from: Tel Aviv (2Km from you)</span>
                    {{itemForDisplay.ownerId}}
                </div>
               Description: <p>{{itemForDisplay.description}}</p>

                <div class="text-xs-center">
                    <v-btn class="btn-book" small>Book Now</v-btn>
                </div>

            </div>
        </div>
        reviews:
    </section>
</template>
<script>
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

  components: {}
};
</script>

<style lang="scss" scoped>

.main-container {
  width: 100%;
  margin: 20px;
  // font-size: 2em;
  // font-family: 'Roboto Slab';
}
.carousel {
  margin: 0px 10px;
  width: 50%;
}

.item-details {
  flex-direction: column;
  padding-left: 5px;
  align-items: end;
}

.btn-book {
  background-color: #f56400;
}
</style>

