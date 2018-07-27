<template>
    <div>
        <v-app light>
    <v-content>
      <v-container>
        <v-layout row wrap align-center>
          <v-flex xs12 md4>
            <div class="text-xs-center">
              <v-avatar size="125px">
                <img
                  class="img-circle elevation-7 mb-1"
                  :src = user.image
                >
              </v-avatar>
                       
              <div class="headline">{{user.name}}</div>
              <div class="subheading text-xs-center grey--text pt-1 pb-3">Lorem ipsum dolor sit amet</div>
              <!-- <v-layout justify-space-between>
                <a href="javascript:;" class="body-2">Home</a>
                <a href="javascript:;" class="body-2">About</a>
                <a href="javascript:;" class="body-2">Github</a>
                <a href="javascript:;" class="body-2">Other</a>
              </v-layout> -->
            </div>
          </v-flex>
          <v-flex xs12 md5 offset-md2>
              items You rented:
            <div v-for="rentedItem in rentedItems" :key="rentedItem._id">
                <!-- <img :src="rentedItem.images[0]"> -->
                 <v-avatar size="120px">
                <img
                  class="img-circle elevation-7 mb-1"
                  :src = "rentedItem.images[0]"
                >
              </v-avatar>

            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
      </v-layout>
    </v-footer>
  </v-app>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {
    console.log(this.$route.params.id);
    this.loadUser(this.$route.params.id);
  },

  methods: {
    loadUser(userId) {
      this.$store
        .dispatch({ type: "loadUserById", userId: userId })
        .then(user => {
          this.loadRentedItems(user.rentedItems);
        });
    },
    loadRentedItems(items){
        console.log('items user rented: ' , items)
         this.$store
        .dispatch({ type: "loadRentedItems", items:items })
    }
  },

  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    },
    rentedItems() {
      return this.$store.getters.rentedItemsByUser;
    }
  }
};
</script>


<style>
</style>
