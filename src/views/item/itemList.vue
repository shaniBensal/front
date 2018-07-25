<<<<<<< HEAD
=======
<template>

<section>
 

  <ul class="items-list">
              
        <li v-for="item in itemsForDisplay" :key="item.id">
              <item-preview :item="item"></item-preview>
                <div class="btns">   
                  <button> <router-link :to="'/item/'+item._id" title="More details">...</router-link></button>
                </div>
             </li>
        </ul>
</section>
</template>

<script>
import itemPreview from "../../components/item/itemPreview.vue";

export default {
  name: "ItemList",

  data() {
    return {};
  },

  created() {
    this.loadItems();
  },
  mounted() {},
  methods: {
    loadItems() {
      this.$store.dispatch({ type: "loadItems" });
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
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
li {
  cursor: pointer;
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
  font-family: "Montserrat", sans-serif;
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

.btns {
}

.filter {
  margin: 10px;
}

input {
  padding: 5px;
}
</style>
>>>>>>> ad72af3d74ce4c7d3cfbe6c9de4bd7ae15abf73a
