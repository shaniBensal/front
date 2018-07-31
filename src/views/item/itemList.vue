<template>
<section>
 

  <v-toolbar dense>
    <!-- <v-overflow-btn
      :items="dropdown_font"
      label="Select font"
      hide-details
    ></v-overflow-btn> -->

    <!-- <v-divider vertical></v-divider> -->



<template>
  <v-layout row wrap>
    <v-flex
      v-for="(bar, i) in bars"
      :key="i"
      xs12
      sm12
      md6
      class="my-3"
    >
      <v-card color="grey lighten-4" flat height="200px">
        <v-toolbar :color="bar.class" :dark="bar.dark">
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>
    <v-overflow-btn
      :items="input" 
      editable
      label="Select size"
      hide-details
      overflow
    ></v-overflow-btn>

    <v-divider
      class="mr-2"
      vertical
    ></v-divider>



<!--
    <v-divider
      class="mx-4"
      vertical
    ></v-divider>
-->

    <v-btn-toggle v-model="toggle_exclusive" class="transparent" >
      <div v-for="(category, idx) in categories" :key="idx" >
        <v-btn :value="idx" flat @click="setSelectedCategory(idx)">
          <div>{{category}}</div>
        </v-btn>
      </div>
    </v-btn-toggle>

  </v-toolbar>

<br>
<br>
<br>
<br>

  <ul class="items-list">
        <li v-for="item in itemsForDisplay" :key="item.id">
              <item-preview :item="item"></item-preview>
                <!-- <div class="btns">   
                  <button> <router-link :to="'/item/'+item._id" title="More details">...</router-link></button>
                </div> -->
             </li>
        </ul>
</section>
</template>

<script>
import itemPreview from '../../components/item/itemPreview.vue';

export default {
  name: 'ItemList',

  data() {
    return {
      categories: [],
        dropdown_edit: [
          { text: '100%' },
          { text: '75%' },
          { text: '50%' },
          { text: '25%' },
          { text: '0%' }
        ],
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3]
    };
  },

  created() {
    },

  mounted() {
    this.loadCategories();
    itemsForDisplay = this.loadItems();
      this.$store.commit({type : 'refreshItems'});
  },

  methods: {
    loadItems() {
      this.$store.dispatch({ type: 'loadItems' });
    },
    loadCategories() {
      // console.log('** itemList->mehods->loadCategories **');
      this.categories = this.$store.getters.categories;
      // console.log('** this.categories =', this.categories);
    },
    setSelectedCategory(categoryIdx) {
      this.$store.commit('setFilterByCategory' , {idx: categoryIdx})
    // console.log('button', categoryIdx);
         
      // var filterByCategory = this.$store.getters.filteredItems  // the getter returns here a function
      // var res = filterByCategory(categoryIdx);
      // console.log('items array is: ', res);
      // this.$store.commit({type="itemsForDisplay" , res })

    },  
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

  /* cursor: pointer;
  margin: 10px 10px;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #d2952ebf;
  transition: 0.3s;
  border-radius: 5px;
  border: 1px solid bisque;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: "Montserrat", sans-serif; */
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