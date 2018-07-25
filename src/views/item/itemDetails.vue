<template>
    <section v-if="itemForDisplay">
        <button @click="goBackToList">back</button>
            <img :src="itemForDisplay.images[0]"/>
            <!-- <img :src=imgURL> -->
        <h1> {{itemForDisplay.title}} {{itemForDisplay.price}}</h1> 
        pick up from: Tel Aviv (2Km from you)

        <p>{{itemForDisplay.description}}</p>

        <button>Book Now</button>

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

<style lang="scss">
</style>

