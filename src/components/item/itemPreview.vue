<template>
  
  <div class="item-preview"> 
    
      <v-card  :to="'/item/' + item._id">
        <v-card-media
          class="white--text"
          height="60%"
          :src="item.images[0]"
        >
          
          <div class="text-xs-center">
           <v-btn @click.prevent="addToFavorites" flat icon color="pink">
              <v-icon >favorite</v-icon>
            </v-btn>
          </div>
          
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                
                <span class="headline">{{item.name}}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span>{{shortDescription}}</span><br>
            <h4 class="price">{{item.price}}$ per day</h4>
                                        
          </div>

        </v-card-title>
        <v-card-actions>
          <!-- <v-btn flat color="#8ACB88">Find out more</v-btn> -->
        <div class="rank">
          ⭐
          {{avgRank}}
          ({{item.ranking.count}})
          
          </div>
       
        </v-card-actions>
         <div class="location">Tel Aviv, 0.8 km from you</div>
      </v-card>

    
  </div> 
                 
</template>

<script>
export default {
  name: "ItemPreview",
  props: ["item"],
  methods: {
    addToFavorites() {
      // console.log("added to favorites");
    }
  },
  computed: {
    shortDescription() {
      if (this.item.description.length > 50)
        return this.item.description.substring(0, 50) + "...";
      else return this.item.description;
    },
    avgRank(){
      return this.item.ranking.avg.toFixed(1)
    }
  }
};
</script>

<style scoped lang="scss">
.rank{
  display: flex;

}
.v-card {
  height: 355px;
  margin: 20px;
}

.v-btn--icon {
  right: 10px;
}
a {
  color: #42b983;
}
.v-card__media {
  height: 60%;
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
