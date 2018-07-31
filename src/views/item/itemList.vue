<template>
<keep-alive>
    <section>
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
                    <v-btn :value="idx" flat @click="setSelectedCategory(idx)">
                        <div>{{category}}</div>
                    </v-btn>
                </div>
            </v-btn-toggle>
        </v-toolbar>

        <ul class="items-list">
            <li v-for="item in itemsForDisplay" :key="item._id">
                <item-preview :item="item"></item-preview>
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
      toggle_multiple: null // [1, 2, 3]
    };
  },

  created() {
    var vars = [];
    var hash;
    var urlStr = window.location.href;
    var searchParamsIndex = urlStr.indexOf('=');
    var searchQuery = '';
    if (searchParamsIndex > -1) {
      searchQuery = urlStr.slice(searchParamsIndex + 1);
    }
    this.setFiltersByTitle(searchQuery);
    this.loadCategories();
    this.loadItems();
  },

  methods: {
    onSearch() {
      this.$router.push(`/item/?search=${this.searchStr}`);
      var urlStr = window.location.href;
      var searchParamsIndex = urlStr.indexOf('=');
      var searchQuery = '';
      if (searchParamsIndex > -1) {
        searchQuery = urlStr.slice(searchParamsIndex + 1);
      }
      this.setFiltersByTitle(searchQuery);
    },
    loadItems() {
      this.$store.dispatch({ type: 'loadItems' });
    },
    loadCategories() {
      this.categories = this.$store.getters.categories;
    },
    setSelectedCategory(categoryIdx) {
      this.$store.commit('setFilterByCategory', {
        category: this.categories[categoryIdx]
      });
      this.$router.push((this.$route.fullPath) + `&category=${this.categories[categoryIdx]}`)
    },

    setFiltersByTitle(txt) {
      this.$store.commit('setFiltersByTitle', { txt: txt });
    }
  },

  computed: {
    itemsForDisplay() {
      return this.$store.getters.itemsForDisplay;
    }
  },

  components: {
    itemPreview
  }
};
</script>



<style scoped>
h3 {
  margin: 0;
  padding: 5px;
}
ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
}
li {
  width: 25%;
}

li:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.445);
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
</style>