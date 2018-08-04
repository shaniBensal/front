<template>
    <keep-alive>
        <section>
            <v-toolbar class="toolbar item-list">

                <v-form @submit="onSearch">
                    <v-card class="pa-3" color="transparent" flat>
                        <v-text-field placeholder="Search" v-model="searchStr" @input="onSearch" autofocus hide-details single-line>
                            <v-btn icon @click="onSearch">
                                <v-icon>search</v-icon>
                            </v-btn>
                            <v-icon>search</v-icon>
                        </v-text-field>
                    </v-card>
                </v-form>

                <div class="spacer"></div>

                <v-btn-toggle v-model="toggle_exclusive_2" class="transparent">
                    <div v-for="(sorting, idx) in sortings" :key="idx">
                        <v-btn :value="idx" flat @click="changeSort(sorting)">
                            <div>{{sorting}}</div>
                        </v-btn>
                    </div>
                </v-btn-toggle>


                <div class="spacer">|</div>


                <v-btn-toggle v-model="toggle_exclusive" class="transparent">
                    <div v-for="(category, idx) in categories" :key="idx">
                        <v-btn :value="idx" flat @click="setFiltersByCategory(category)">
                            <div>{{category}}</div>

                        </v-btn>
                    </div>
                </v-btn-toggle>
            </v-toolbar>
            <div class="mobile-buttons">
                <div>
                    <div class="text-xs-center">
                        <v-form @submit.prevent="onSearch">
                            <v-btn slot="activator" color="primary" dark>
                                Search
                            </v-btn>
                            <v-card class="pa-3" color="transparent" flat>
                                <v-text-field placeholder="Search" v-model="searchStr" @input="onSearch" autofocus hide-details single-line>
                                    <v-btn icon @click.stop="onSearch">
                                        <v-icon>search</v-icon>
                                    </v-btn>
                                    <v-icon>search</v-icon>
                                </v-text-field>
                            </v-card>
                        </v-form>
                        <!--
          <v-list>
            <v-list-tile
              v-for="(item, i) in items"
              :key="i"
              @click=""
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
          -->
                        <v-menu transition="slide-x-transition" bottom right>
                            <v-btn slot="activator" class="deep-orange" color="primary" dark>
                                Sort
                            </v-btn>

                            <v-list>
                                <v-list-tile v-for="(sorting, i) in sortings" :key="i" @click="changeSort(sorting)">
                                    <v-list-tile-title>{{ sorting }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <v-menu transition="slide-y-transition" bottom>
                            <v-btn slot="activator" class="purple" color="primary" dark>
                                Categories
                            </v-btn>
                            <v-list>
                                <v-list-tile v-for="(category, i) in categories" :key="i" @click="setFiltersByCategory(category)">
                                    <v-list-tile-title>{{ category }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
                <!-- <v-btn :round=false>Search</v-btn>
              <v-btn>Sort</v-btn>
              <v-btn>Categories</v-btn> -->
            </div>
            <ul class="items-list">
                <li v-for="item in sortedItems" :key="item._id">
                    <item-preview @getDistance="getDistance($event ,item._id)" :item="item"></item-preview>
                </li>
            </ul>
        </section>
    </keep-alive>
</template>
<script>
import itemPreview from '../../components/item/itemPreview.vue';

export default {
  name: 'ItemList',

  data() {
    return {
      searchStr: null,
      categories: [],
      toggle_exclusive: [],
      toggle_exclusive_2: [],
      sortings: ['Name', 'Availiblity', 'Price', 'Distance', 'Rating'],
      toggle_multiple: null, // [1, 2, 3]
      sortBy: '',

       items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]


    };
  },

  created() {
    var queryString = window.location.href.replace(/.*\?/, '');
    var uParams = new URLSearchParams(queryString);
    var textParam = uParams.get('search');
    var categoryParam = uParams.get('category');
    if (textParam) this.setFiltersByTitle(textParam);
    if (categoryParam) this.setFiltersByCategory(categoryParam);
    this.loadCategories();
    this.loadItems();
  },

  methods: {
    onSearch() {
      console.log(' ON SEARCH');
      
      var query = 'search=' + this.searchStr;
      var category = this.$route.query.category;
      if (category) {
        query += '&category=' + category;
      }
      this.$router.push(`${this.$route.path}?${query}`);
      var urlStr = window.location.href;
      this.setFiltersByTitle(this.searchStr);
    },
    loadItems() {
      this.$store.dispatch({ type: 'loadItems' });
    },
    loadCategories() {
      this.categories = this.$store.getters.categories;
    },
    setFiltersByCategory(category) {
      if (category !== 'all') {
        this.$store.commit('setFiltersByCategory', {
          category: category
        });
      } else {
        this.$store.commit('setFiltersByCategory', {
          category: ''
        });
      }
      var query = 'category=' + category;
      var search = this.$route.query.search;
      if (search) {
        query += '&search=' + search;
      }
      this.$router.push(`${this.$route.path}?${query}`);
    },

    setFiltersByTitle(txt) {
      this.$store.commit('setFiltersByTitle', { txt: txt });
    },

    changeSort(criteria) {
      this.sortBy = criteria;
    },

    getDistance(dist, itemId) {
    var currItem = this.sortedItems.find(item => {
      return item._id === itemId;
    })  
    currItem.distance = dist;
    },
  },

  computed: {
    itemsForDisplay() {
      return this.$store.getters.itemsForDisplay;
    },

    sortedItems() {
      var itemsCopy = this.itemsForDisplay.slice();
      switch (this.sortBy) {
        case 'Name':
          itemsCopy.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            else return -1;
          });
          break;

        case 'Price':
          itemsCopy.sort((a, b) => {
            if (+a.price > +b.price) return 1;
            else return -1;
          });
          break;

        case 'Rating':
          itemsCopy.sort((a, b) => {
            if (+a.ranking.avg > +b.ranking.avg) return -1;
            else if (+a.ranking.avg < +b.ranking.avg) return 1;
            return 0;
          });
          break;

          case 'Distance':
          itemsCopy.sort((a,b) => {
            if (+a.distance > +b.distance) return 1;
            else return -1;
          });
          break;
      }
      return itemsCopy;
    }
  },

  components: {
    itemPreview
  }
};
</script>



<!--
<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    })
  }
</script>
-->



<style scoped>



.container {
  padding: 0 20px;
  max-width: 980px;
}

h3 {
  margin: 0;
  padding: 5px;
}
ul {
  list-style-type: none;
  padding: 0;

  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 200px);
}

a {
  text-decoration: none;
  color: #273e74;
}

a:visited {
  color: none;
}

button {
  cursor: pointer;
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
}

.filter {
  margin: 10px;
}

input {
  padding: 5px;
}

.v-input {
  min-width: 180px;
}


.v-toolbar {
  margin-bottom: 100px;
}

.v-btn.v-btn {
  /* background-color: white; */
  color: rgb(4, 4, 73);
  opacity: 1;
  border: none;
}

.v-btn.v-btn--active {
  /* background-color: white; */
  color: rgb(33, 111, 42);
  text-shadow: 0 0 3px rgb(156, 247, 138);
  opacity: 1;
  border-bottom: 1px rgb(33, 111, 42) solid;
}

.v-btn.v-btn--flat:visited {
   /* background-color: white; */
  color: rgb(33, 111, 42);
  text-shadow: 0 0 3px rgb(156, 247, 138);
  opacity: 1;
  border-bottom: 1px rgb(33, 111, 42) solid;
}

.v-btn.v-btn--active::before {
   /* background-color: white; */
  opacity: 1;
}

.toolbar {
  margin-bottom: 50px;
}

ul.items-list {
margin: 0 auto;
justify-content: center;
}
</style>


<!-- style not scoped:  -->
<style>  



.item-list .v-toolbar__content {
  flex-wrap: wrap;
  height: 120px !important;
  padding-bottom: 20px;
}


  .mobile-buttons {
    display : none;
  }

@media (max-width: 440px) {

.mobile-buttons div {
  padding : 0 !important;
  margin: 0 !important;
}


.mobile-buttons form {
  padding : 0 !important;
  margin: 0 !important;
}

  ul {
  grid-template-columns: 88vw !important; 
  }

  .toolbar.item-list {
    display : none;
  }

  .mobile-buttons {
    display : flex;
    justify-content: space-around;
    margin: 8px 0 12px 0;
  }

  .mobile-buttons button {
    border-radius: 5% !important;
    font-size : 0.8rem;
  }

  .v-list-tile {
    background-color : rgba(222,177,0,1) !important;
  }

  
  .v-list-tile-title {
    background-color : rgba(222,177,0,1) !important;
  }

.v-menu__content {
  background-color: rgba(222,222,222,.94) !important;
  left: 0 !important;
}

}


</style>