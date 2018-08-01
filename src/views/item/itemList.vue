<template>
<keep-alive>
    <section>
      <div class="container">
        <v-toolbar>
            <template>
            </template>
  
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

            <v-btn-toggle v-model="toggle_exclusive" class="transparent">
                <div v-for="(category, idx) in categories" :key="idx">
                    <v-btn :value="idx" flat @click="setFiltersByCategory(category)">
                        <div>{{category}}</div>
                    </v-btn>
                </div>
            </v-btn-toggle>
        </v-toolbar>

        <!-- <ul class="items-list-random">
            <li v-for="item in itemsForDisplay" :key="item._id">
                <item-random :item="item"></item-random>
            </li>
        </ul> -->

        <ul class="items-list">
            <li v-for="item in itemsForDisplay" :key="item._id">
                <item-preview :item="item"></item-preview>
            </li>
        </ul>
    </div>
    </section>
</keep-alive>
</template>



<script>
import itemPreview from "../../components/item/itemPreview.vue";
// import itemRandom from "./itemRandom.vue";

export default {
  name: "ItemList",

  data() {
    return {
      searchStr: null,
      categories: [],
      toggle_exclusive: [],
      toggle_multiple: null // [1, 2, 3]
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
      var query = 'search=' + this.searchStr;
      var category = this.$route.query.category;
      if (category) {
        query += '&category=' + category;
      }
      this.$router.push(`${this.$route.path}?${query}`);

      // this.$router.push(`/item/?search=${this.searchStr}`);
      var urlStr = window.location.href;
      // var searchParamsIndex = urlStr.indexOf('=');
      // var searchQuery = '';
      // if (searchParamsIndex > -1) {
      //   searchQuery = urlStr.slice(searchParamsIndex + 1);
      // }
      this.setFiltersByTitle(this.searchStr);
    },
    loadItems() {
      this.$store.dispatch({ type: "loadItems" });
    },
    loadCategories() {
      this.categories = this.$store.getters.categories;
    },
    setFiltersByCategory(category) {
      this.$store.commit('setFiltersByCategory', {
        category: category
      });
      var query = 'category=' + category;
      var search = this.$route.query.search;
      if (search) {
        query += '&search=' + search;
      }
      this.$router.push(`${this.$route.path}?${query}`);
    },

    setFiltersByTitle(txt) {
      this.$store.commit("setFiltersByTitle", { txt: txt });
    }
  },

  computed: {
    itemsForDisplay() {
      return this.$store.getters.itemsForDisplay;
    }
  },

  components: {
    itemPreview,
    // itemRandom
  }
};
</script>



<style scoped>
.container {
  max-width: 980px;
  padding: 0 20px;
}

h3 {
  margin: 0;
  padding: 5px;
}
ul {
  list-style-type: none;
  /* display: flex;
  flex-wrap: wrap; */
  padding: 0;
  margin: 20px 0px;
  /* justify-content: center; */

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

button:hover {
  background-color: #caa830;
}

.filter {
  margin: 10px;
}

input {
  padding: 5px;
}

v-toolbar {
  margin-bottom: 100px;
}

.v-btn.v-btn {
  background-color: white;
  color: rgb(4, 4, 73);
  opacity: 1;
  border: none;
}

.v-btn.v-btn--active {
  background-color: white;
  color: rgb(33, 111, 42);
  text-shadow: 0 0 3px rgb(156, 247, 138);
  opacity: 1;
  border-bottom: 1px rgb(33, 111, 42) solid;
}

.v-btn.v-btn--active::before {
  background-color: white;
  /* color: rgb(10, 117, 73); */
  opacity: 1;
}




</style>