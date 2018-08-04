<!--
 ***********  Cloudinary API Details  ***********
 API key: 426892163833235
 API secret: WRXQ4xqAJq2UPOdeHPbD0iduQ8o
 Environment variable: CLOUDINARY_URL=cloudinary://426892163833235:WRXQ4xqAJq2UPOdeHPbD0iduQ8o@tomerberman
-->


<template>

<div class="outer-container">
   <v-app light>
    <!-- <v-toolbar class="white">
      <v-toolbar-title></v-toolbar-title>
    </v-toolbar> -->
    <v-content>
        <!-- <div class="pic-cover"></div> -->
      <section>
        
                <v-parallax class="top-pic" src="https://thumbs.dreamstime.com/z/tourist-girl-back-sack-tracking-sticks-staying-lawn-bushes-pink-rhododendrons-tourist-girl-119439266.jpg">
              <!-- <v-parallax class="top-pic" src="https://previews.123rf.com/images/deagreez/deagreez1509/deagreez150900714/45603428-couple-in-love-together-to-ride-a-bicycle-with-ballons.jpg"> -->
          <!-- <v-parallax class="top-pic" src="https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg"  height="500"> -->
          <v-layout 
            class="opaque-background" 
            column
            align-center
            justify-end
          >
            <!-- <img src="../../../front/best-price.png" alt="Vuetify.js" height="200"> -->
            <h1 class="layout-test1 display-3 text-xs-center color:#162044 ">Rent anything, anywhere. anytime</h1>
            <div class="subheading mb-3 text-xs-center"></div>
            <div class="subheading mb-3 text-xs-center"></div>
            <div class="subheading mb-3 text-xs-center"></div>
            <div class="subheading mb-3 text-xs-center"></div>
            <!-- <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn> -->

<v-form @submit="onSearch" class="header-search-bar">
  <v-card 
    class="pa-3"
    color="transparent"
    flat
  >
    <v-toolbar 
      dense
      floating
    >
      <v-text-field  
        v-model="searchStr"
        autofocus
        hide-details
        prepend-icon="search"
        single-line
      ></v-text-field>

      <v-btn icon @click="onSearch">
        <v-icon>my_location</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
  </v-form>


          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class= "site-description"
          align-center
        >
          <v-flex class="my-3" xs12 sm4>
            <div class="text-xs-center">
              <h2 class="headline">Social Renting Has Never Been Easier</h2>
              <span class="subheading">
                Rent Anything You Need & Rent-out Everything You Don't Need
              </span>
            </div>
          </v-flex>
        </v-layout>
      </section>

        
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="card-test1 elevation-0 transparent">
                    <v-card-text @click="$router.push('/item')" class="text-xs-center">
                      <!-- <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon> -->
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                       <!-- <v-icon>fas fa-search</v-icon> -->
                    </v-card-title>
                      <div class="headline text-xs-center v-float">Search what you need</div>
                      
                      <br>

                       
                                  <!-- <img src="http://greensimon.zippykid.netdna-cdn.com/wp-content/uploads/2011/09/osprey-aether-207x300.png" alt="Vuetify.js" height="200"> -->
                    <v-card-text>
                      <!-- A1 facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.  -->
                      <!-- Search the item you wish for. it can be anything -->
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="card-test2 elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <!-- <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon> -->
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                           <!-- <v-icon>fas fa-shopping-cart</v-icon> -->
                    </v-card-title>
                      <div class="headline">Book it</div>
                      <br>
                                  <!-- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6vY6TvS6Pob0jhjIyZGS-PFu8HY-3Yd2KqFsPxxtQsqPDBvJ" alt="Vuetify.js" height="200"> -->
                                  <!-- <img src="https://www.slideteam.net/media/catalog/product/cache/1/thumbnail/46f236fda059ac53be7e0eb63e725afa/s/m/smart_phone_with_map_and_multiple_locations_displayed_stock_photo_Slide01.jpg" alt="Vuetify.js" height="200"> -->

                    <v-card-text>
                      <!-- A2 facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.  -->
                      <!-- It doesn't metter where you are, just choose the location of pick-up  -->
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="card-test3 elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <!-- <v-icon x-large class="blue--text text--lighten-2">build</v-icon> -->
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                        <!-- <v-icon>fas fa-shopping-cart</v-icon> -->
                    </v-card-title>
                      <div class="headline text-xs-center">Enjoy it</div>
                      <br>
                                  <!-- <img src="https://pics.clipartpng.com/Blender_PNG_Clip_Art-2447.png" alt="Vuetify.js" height="200"> -->
                                   <!-- <img src="https://ohiovalley.nfty.org/wp-content/uploads/sites/43/2017/04/calendar.png" alt="Vuetify.js" height="200"> -->

                    <v-card-text>
                      <!-- A3 facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.  -->
                      <!-- Choose date, check availability and book!. -->
                      <!-- that's it , you are ready to ba a part of We Rent community. -->
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>



  <!-- <v-container class="highlighted-products" fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex  d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex @click="onCategory('kids')" d-flex>
            <v-card class="pic2"  color="blue-grey" dark tile flat hover>
              <v-card-text></v-card-text>
              <h1>Kids and games </h1>
            </v-card>
          </v-flex> -->
          <!-- <v-flex d-flex>
            <v-card color="brown" dark tile flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-flex> -->
        <!-- </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm7>
        <v-layout row wrap>
          <v-flex @click="onCategory('travel')" d-flex>
            <v-card class="pic0" color="indigo lighten-2" dark tile flat hover>
              <h1>Travel Equipment</h1>
            </v-card>
          </v-flex>
             -->
          <!-- <v-flex d-flex>
            <v-layout row>
              <v-flex @click="onCategory('transportation')"
                d-flex
              >
            
                <v-card class="pic1"
                  color="indigo lighten-2"
                  tile
                  flat
                  hover
                > -->
               
                  <!-- <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text> -->
                    <!-- <h1>Transportation</h1>
                </v-card>
              </v-flex>
               <v-flex @click="onCategory('kitchen')"
                d-flex
              >
                <v-card class="pic1b"
                  color="amber lighten-2"
                  tile
                  flat
                  hover
                > -->
                  <!-- <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text> -->
                  <!-- <h1>Home Appliances And Electronics </h1>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex @click="onCategory('events')" d-flex xs12 sm5 child-flex>
        <v-card class="pic3" color="orange lighten-2" tile flat hover>
          <! <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text> -->
            <!-- <h1>Events and weddings</h1>
        </v-card> -->
      <!-- </v-flex>  -->
      <!-- <v-flex d-flex xs12 sm3>
        <v-card color="red lighten-2" dark tile flat>
          <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
        </v-card>
      </v-flex> -->
    <!-- </v-layout>
  </v-container> -->



<router-link class="see-more" to="/item">
  <v-btn class="all-items">
    See 7,400+ More
  </v-btn>
</router-link>

  

    <div class="opinions-container">
      <div>Customers Recommend:</div>
    </div>

   <div id="header-carousel">
      <v-carousel class="opinions" hide-controls hide-delimiters interval=3000 transition="fade">
        <v-carousel-item v-for="(slide, i) in slides"
         :src="slide.src" 
         :key="i"
         reverse-transition="fade"
         transition="fade"
      >
          <v-jumbotron dark>
            <v-container fill-height>
              <v-layout align-top align-left>
                <v-flex>
                  <h3 class="display-3">{{ slide.title }}</h3>
                  <span class="subheading">{{ slide.text }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-carousel-item>
      </v-carousel>
    </div>

<br>
<br>
<br>

    </v-content>
   </v-app>
</div>
</template>



<script>
// <img class="main-pic" src="https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data: () => ({
    searchStr: "",
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,

    slides: [
      {
        src:
          "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&h=800",
        title: "Dana Loremovich, 28, New York City",
        text: "Amazing products, amazing price. great website by the way."
      },
      {
        src:
          "https://images.pexels.com/photos/1080243/pexels-photo-1080243.png?auto=compress&cs=tinysrgb&h=800",
        title: "George Orwell, 36, Tel Aviv",
        text:
          "What I like about WeRent, is the ease of use they offer. The whole process starting with choosing the right product and the right owner, picking up the stuff and all the way to returning it and paying- was silky smooth and super easy."
      },
      {
        src:
          "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750",
        title: "Yonit Jhonson, 44, Monaco",
        text:
          "I thought it is a waste of time and money but I was surprised it was actually great!"
      },
      {
        src:
          "https://images.pexels.com/photos/325682/pexels-photo-325682.jpeg?auto=compress&cs=tinysrgb&h=800",
        title: "Ofir Yakito, 22, Bogota",
        text:
          "BEST SERVICE EVER. period. I like about WeRent, is the ease of use they offer. The whole process starting with choosing the right product and the right owner, picking up the stuff and all the way to returning it and paying- was silky smooth and super easy."
      }
    ]
  }),
    
  name: 'home',
  components: {
    HelloWorld
  },

  methods: {
    onSearch() {
      // console.log('query for search:',this.searchStr);
      this.$router.push(`/item/?search=${this.searchStr}`);
    },

    onCategory(category) {
      this.$router.push(`/item/?category=${category}`);
    }
  }
};
</script>

<style scoped lang="scss">


.outer-container {
  margin: 0 auto;
}

.v-toolbar__content,
.v-toolbar__extension {
  width: 70vw;
}

.main-title {
  height: 80px;
  padding: 0;
  margin: 0;
  font-size: 2.5em;
}

.descrip {
  display: block;
}

.testing {
  height: 100%;
  background-image: url("https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg");
}

/* .test1 {
  height: 440px;
} */

h1 {
  color: white;
  z-index: 20;
}

/* .title { */
/* height: 500px; */
/* } */

.pic3 {
  min-height: 240px;
  /* background-image: url("https://www.dhresource.com/0x0s/f2-albu-g3-M00-61-8D-rBVaHVX35Y-AXKZDAAZsfqEcV8U465.jpg/night-club-lighting-24-patterns-rgb-laser.jpg"); */
  background-image: url("https://thumbs.dreamstime.com/b/festival-event-party-people-blurred-background-outdoor-65006620.jpg");
  background-size: cover;
  cursor: pointer;
}

.pic2 {
  height: 180px;
  /* background-image: url("http://familypoolcleaning.com/wp-content/uploads/Plantation-Pool-Cleaning-Service.jpg"); */
background-image: url("https://previews.123rf.com/images/famveldman/famveldman1505/famveldman150500052/39757272-kids-playing-with-wooden-toys-two-children-cute-toddler-girl-and-funny-baby-boy-playing-with-toy-blo.jpg");
background-size: cover;
  background-position-y: 82%;
  /* margin-bottom: 150px; */
  cursor: pointer;
}

.pic1 {
  height: 220px;
  background-image: url("http://www.rentacarvietnam.com/wp-content/uploads/2017/02/rent-a-car-1.jpg");
  background-size: cover;
  background-position-x: 45%;
  cursor: pointer;
}

.pic1b {
  height: 220px;
  background-image: url('https://previews.123rf.com/images/alexutemov/alexutemov1604/alexutemov160401499/54904458-home-appliances-design-cooking-applications-and-home-appliances-equipment-kitchen-home-appliances-ho.jpg');
  background-size: cover;
  background-position-x: 65%;
  cursor: pointer;
}

.pic0 {
  height: 200px;
  background-image: url("https://thumbs.dreamstime.com/z/hiking-equipment-backpack-boots-top-mountain-beautiful-view-to-ranges-fog-filled-valleys-89063285.jpg");
  background-size: cover;
  background-position-y: 50%;
  cursor: pointer;
}

.highlighted-products {
  padding: 0;
  margin-bottom: 20px;
}


.card-test1,
.card-test2,
.card-test3 {
  cursor: pointer;
}

.pic2:hover,
.pic1:hover,
.pic1b:hover,
.pic0:hover,
.pic3:hover {
  filter: brightness(1.11);
  transition: 0.3s;
}

.top-left {
  left: 12px;
  top: 10px;
  font-size: 1.3em;
  line-height: 1.6em;
  text-align: left;
  width: 250px;
  height: 0px;
  position: relative;
  z-index: 10;
  /* background-color: rgba(190, 240, 0, 0.6); */
}

.opaque-background {
  /* content: ''; */
  background: linear-gradient(
    rgba(30, 30, 60, 0),
    rgba(30, 30, 60, 0),
    rgba(30, 30, 60, 0),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4),
    rgba(30, 30, 60, 0.1)
  );
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  /* opacity: 0.95; */
}

.header-search-bar {
  z-index: 1;

}

.layout-test1 {
  text-shadow: 0 0 2px black;
  position: absolute;
  bottom: 28%;
}

.opinions-container {
  font-size: 2em;
  margin: 80px 0 50px 0 !important;
}

#header-carousel {
  /* text-shadow : 0 0 2px grey; */
  text-align : left;
}

.v-jumbotron {
  background: linear-gradient( 90deg, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.2), rgba(255,255,255,0), rgba(0,0,0,0), rgba(0,0,0,0));
}

#header-carousel h3  {
  align-self: top;
  font-size: 2.5rem !important;
  color: black;
 width: 320px;
}

#header-carousel .subheading {
    color: black;
  font-size: 1.3em !important;


  width : 240px;
  display: inline-block;
}

.v-card h1 {
  text-shadow: 0 0 4px black;
}

.v-jumbotron .theme--dark {
  height: 100% !important;
}

div .fill-height {
  margin: 0;
}

.site-description {
padding: 100px 0 100px 0 !important;

}


.v-footer.blue.darken-2 {
  background-color :#162044 !important;
}


.all-items {
  background-color: #e4e7f1 !important;
  color: black !important;
}

.see-more {
  /* text-decoration-style: none !important; */
}
</style>



<style scoped lang="stylus">
.fade {
  &-enter-active, &-leave-active, &-leave-to {
    transition: 1.1s linear;
    position: absolute;
    top: 0;
    left: 0;
  }

  &-enter, &-leave, &-leave-to {
    opacity: 0;
  }
}
</style>





