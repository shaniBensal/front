<template>
  
  <div class="item-preview" v-if="item"> 
    <!-- <sign-up-modal v-if="isUserLoggedIn"></sign-up-modal> -->
    
      <v-card  :to="'/item/' + item._id">
        <v-card-media
          class="white--text"
          height="16em"
          :src="item.images[0]"
        >
          
          <div class="text-xs-center">
           <v-btn @click.prevent="addToFavorites" flat icon color="pink"  :disabled="dialog"
          :loading="dialog"
           class="white--text"
           @click.stop="dialog = true">
              <v-icon >favorite</v-icon>
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
                <h3>{{item.title}}</h3>
            <p>{{shortDescription}}</p><br>
            <h4 class="price">{{item.price}}$ per day</h4>
            <div class="location">Tel Aviv, 0.8 km from you</div>
              <div class="rank" v-if="item">
          ⭐
          {{avgRank}}
          ({{item.ranking.count}})
          
          </div>
                                        
          </div>

        </v-card-title>
        <v-card-actions>
          <!-- <v-btn flat color="#8ACB88">Find out more</v-btn> -->
      
       
        </v-card-actions>
         
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
      if (this.item.description.length > 50)
        return this.item.description.substring(0, 50) + "...";
      else return this.item.description;
    },
    avgRank() {
      return this.item.ranking.avg.toFixed(1);
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
.rank {
  display: flex;
}

h3{
  color: #162044;
  text-align: center;
}

p{
  margin: 0;
}
.v-card {
  margin: 20px 10px 10px 10px;
  max-width: 250px;
}

.v-btn--icon {
  right: 10px;
}
a {
  color: #42b983;
}
.v-card__media {
  height: 16em;
  width: 100%;
  margin: 0 auto;
}

.v-card__media__background {
  height: 120%;
  top: 15px;
}

.v-card__title {
  color: black;
  text-align: left;
  padding: 10px 10px 0 10px;
}

.v-card__actions {
  justify-content: center;
}

.price {
  margin-top: 10px;
  color: #42b983;
  text-align: center;
}

.location {
  color: black;
}
</style>
