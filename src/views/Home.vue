<template>

<div class="outer-container">
   <v-app light>
    <!-- <v-toolbar class="white">
      <v-toolbar-title></v-toolbar-title>
    </v-toolbar> -->
    <v-content>
      <section>
        <v-parallax class="top-pic" src="https://previews.123rf.com/images/deagreez/deagreez1509/deagreez150900714/45603428-couple-in-love-together-to-ride-a-bicycle-with-ballons.jpg"  height="500">
          <!-- <v-parallax class="top-pic" src="https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg"  height="500"> -->
          <v-layout  
            column
            align-center
            justify-end
          >
            <!-- <img src="../../../front/best-price.png" alt="Vuetify.js" height="200"> -->
            <h1 class="layout-test1 display-3 mb-2 text-xs-center color:#162044 ">Rent anything, anywhere, anytime.</h1>
            <div class="subheading mb-3 text-xs-center"></div>
            <!-- <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn> -->

<v-form @submit="onSearch">
  <v-card
    class="pa-3"
    color="transparent"
    flat
  >
    <v-toolbar
      dense
      floating
      inverted-scroll
      scroll-off-screen
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
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">We Rent.</h2>
              <span class="subheading">
                It's that simple
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="card-test1 elevation-0 transparent">
                    <v-card-text @click="$router.push('/item')" class="text-xs-center">
                      <!-- <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon> -->
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                    </v-card-title>
                      <div class="headline text-xs-center v-float">1. Choose What</div>
                      <br>
                                  <img src="http://greensimon.zippykid.netdna-cdn.com/wp-content/uploads/2011/09/osprey-aether-207x300.png" alt="Vuetify.js" height="200">
                    <v-card-text>
                      <!-- A1 facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.  -->
                      Search the item you wish for. it can be anything
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="card-test2 elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <!-- <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon> -->
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                    </v-card-title>
                      <div class="headline">2. Choose Where</div>
                      <br>
                                  <!-- <img src="http://cdn.shopify.com/s/files/1/2654/0420/products/TBS-6210-01_red_1_098808e0-c9da-4c09-945b-4c85a1de0b5c_1024x1024.png?v=1521605873" alt="Vuetify.js" height="200"> -->
                                  <img src="https://www.slideteam.net/media/catalog/product/cache/1/thumbnail/46f236fda059ac53be7e0eb63e725afa/s/m/smart_phone_with_map_and_multiple_locations_displayed_stock_photo_Slide01.jpg" alt="Vuetify.js" height="200">

                    <v-card-text>
                      <!-- A2 facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.  -->
                      It doesn't metter where you are, just choose the location of pick-up 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="card-test3 elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <!-- <v-icon x-large class="blue--text text--lighten-2">build</v-icon> -->
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                    </v-card-title>
                      <div class="headline text-xs-center">3. Choose When</div>
                      <br>
                                  <!-- <img src="https://pics.clipartpng.com/Blender_PNG_Clip_Art-2447.png" alt="Vuetify.js" height="200"> -->
                                   <img src="https://ohiovalley.nfty.org/wp-content/uploads/sites/43/2017/04/calendar.png" alt="Vuetify.js" height="200">

                    <v-card-text>
                      <!-- A3 facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.  -->
                      Last step, choose date - we will show you the availability of each item.
                      <!-- that's it , you are ready to ba a part of We Rent community. -->
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>


  <v-container class="highlighted-products" fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex d-flex>
            <v-card class="pic2" color="blue-grey" dark tile flat hover>
              <v-card-text></v-card-text>
              <h1>Kids and games </h1>
            </v-card>
          </v-flex>
          <!-- <v-flex d-flex>
            <v-card color="brown" dark tile flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-flex> -->
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm7>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card class="pic0" color="indigo lighten-2" dark tile flat hover>
              <h1>Travel Equipment</h1>
            </v-card>
          </v-flex>
            
          <v-flex d-flex>
            <v-layout row>
              <v-flex
                d-flex
              >
            
                <v-card class="pic1"
                  color="indigo lighten-2"
                  tile
                  flat
                  hover
                >
               
                  <!-- <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text> -->
                    <h1>Transportation</h1>
                </v-card>
              </v-flex>
               <v-flex
                d-flex
              >
                <v-card class="pic1b"
                  color="amber lighten-2"
                  tile
                  flat
                  hover
                >
                  <!-- <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text> -->
                  <h1>Electricity, home and kitchen</h1>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm5 child-flex>
        <v-card class="pic3" color="orange lighten-2" tile flat hover>
          <!-- <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text> -->
            <h1>Events and weddings</h1>
        </v-card>
      </v-flex>
      <!-- <v-flex d-flex xs12 sm3>
        <v-card color="red lighten-2" dark tile flat>
          <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
        </v-card>
      </v-flex> -->
    </v-layout>
  </v-container>


<!-- Comment
<div class="opinions-container">
  <div class="top-left">George Orwell, 36, Tel Aviv: "What I like about WeRent, is the ease of use they offer. The whole process starting with choosing the right product and the right owner, picking up the stuff and all the way to returning it and paying- was silky smooth and super easy."</div>
</div>
  <v-carousel class="opinions" hide-controls hide-delimiters interval=2500 transition="fade">
     <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade"
      transition="fade"
    ></v-carousel-item>
  </v-carousel>
Comment -->


   <div id="header-carousel">
      <v-carousel class="opinions" hide-controls hide-delimiters interval=2500 transition="fade">
        <v-carousel-item v-for="(slide, i) in slides"
         :src="slide.src" 
         :key="i"
         reverse-transition="fade"
         transition="fade"
      >
          <v-jumbotron dark>
            <v-container fill-height>
              <v-layout align-center>
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

      <section>
        <!-- <v-parallax src="img/ski.jpg" height="380"> -->
        <v-parallax src="https://images.pexels.com/photos/848594/pexels-photo-848594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Renting things has never been easier</div>
            <em>Kick-start your fun today</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>



      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  A4 facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                  Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Contact us</div>
                </v-card-title>
                <v-card-text>
                  Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                </v-card-text>
                <v-list class="transparent">
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">phone</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>777-867-5309</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Chicago, US</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3 headline-1">
              <!-- Sponsered by Coding Academy&#8482 -->
              <!-- <v-icon class="red--text">favorite</v-icon> -->
              <!-- by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a> -->
              <!-- and <a class="white--text" href="https://github.com/vwxyzjn">Costa Huang</a> -->
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>






</div>
</template>





<script>
// <img class="main-pic" src="https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  data: () => ({
    searchStr : '',
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    
    slides: [
      {
        src:
          'https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&h=800',
        title : 'Dana Loremovich, 28, New York City',
        text : 'Amazing products, amazing price. great website by the way.'
      },
      {
        src: 'https://images.pexels.com/photos/1080243/pexels-photo-1080243.png?auto=compress&cs=tinysrgb&h=800',
        title: 'George Orwell, 36, Tel Aviv',
        text: 'What I like about WeRent, is the ease of use they offer. The whole process starting with choosing the right product and the right owner, picking up the stuff and all the way to returning it and paying- was silky smooth and super easy.'
      },
      {
        src: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750',
        title: 'Yonit Jhonson, 44, Monaco',
        text: 'I thought it is a waste of time and money but I was surprised it was actually great!'
      },
      {
        src: 'https://images.pexels.com/photos/325682/pexels-photo-325682.jpeg?auto=compress&cs=tinysrgb&h=800',
        title: 'Ofir Yakito, 22, Bogota',
        text: 'BEST SERVICE EVER. period. I like about WeRent, is the ease of use they offer. The whole process starting with choosing the right product and the right owner, picking up the stuff and all the way to returning it and paying- was silky smooth and super easy.'
      }
    ]
  }),
    
    // items: [
    //   {
    //     src:
    //       'https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&h=800'
    //   },
    //   {
    //     src:
    //       'https://images.pexels.com/photos/1080243/pexels-photo-1080243.png?auto=compress&cs=tinysrgb&h=800'
    //   },
    //   {
    //     src:
    //       'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750'
    //   },
    //   {
    //     src:
    //       'https://images.pexels.com/photos/325682/pexels-photo-325682.jpeg?auto=compress&cs=tinysrgb&h=800'
    //   }
    // ]

  name: 'home',
  components: {
    HelloWorld
  },

  methods : {
    onSearch() {
      console.log('query for search:',this.searchStr);
      this.$router.push(`/item/?search=${this.searchStr}`)
    },
  }
};
</script>

<style lang="scss" scoped>
.outer-container {
  margin: 0 auto;
  max-width: 1080px;
}

.v-toolbar__content, .v-toolbar__extension{
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
  background-image: url('https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg');
}

.test1 {
  height: 440px;
}

h1{
  color: white;
}

/* .title { */
  /* height: 500px; */
/* } */

.pic3 {
  min-height: 240px;
    /* background-image: url("https://www.dhresource.com/0x0s/f2-albu-g3-M00-61-8D-rBVaHVX35Y-AXKZDAAZsfqEcV8U465.jpg/night-club-lighting-24-patterns-rgb-laser.jpg"); */
   background-image: url("https://images.pexels.com/photos/2143/lights-party-dancing-music.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  cursor: pointer;
}

.pic2 {
  height: 180px;
  background-image: url('http://familypoolcleaning.com/wp-content/uploads/Plantation-Pool-Cleaning-Service.jpg');
  background-size: cover;
  background-position-y: 82%;
  margin-bottom: 150px;
  cursor: pointer;
}

.pic1 {
  height: 220px;
  background-image: url('http://www.rentacarvietnam.com/wp-content/uploads/2017/02/rent-a-car-1.jpg');
  background-size: cover;
  background-position-x: 45%;
  cursor: pointer;
}

.pic1b {
  height: 220px;
  background-image: url('https://vgsisrael-vgs.netdna-ssl.com/wp-content/uploads/2017/01/ps4-slim-500-glacier-white2.jpg');
  background-size: cover;
  background-position-x: 65%;
  cursor: pointer;
}

.pic0 {
  height: 200px;
  background-image: url('https://www.burghotel-lech.com/portals/0/teaser/familien-urlaub-arlberg-220U0340.jpg?ver=2016-04-25-094050-570');
  background-size: cover;
  background-position-y: 50%;
  cursor: pointer;
}

.highlighted-products {
  margin-bottom: 100px;
}

.card-test1,
.card-test2,
.card-test3 {
  cursor: pointer;
}

.card-test1:hover,
.card-test2:hover,
.card-test3:hover {
  filter: brightness(1.12);
  background-color: #cacaca !important;
  transition: 0.2s;
}

.pic2:hover,
.pic1:hover,
.pic1b:hover,
.pic0:hover,
.pic3:hover {
  filter: brightness(1.15);
  transition: 0.3s;
}

.opinions {
  margin-bottom: 150px;
}

opinions.container {
  width: 120px;
  height: 60px;
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
    background-color: rgba(190,240,0,0.6);
}

</style>

<style lang="stylus">
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





