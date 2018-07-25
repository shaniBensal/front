<template>

<section>
<div class="filter">
  Search your toy
  <input type="text" placeholder="search by name..." @input="setFilter($event)">
 
</div>
  <ul class="toys-list">
              
        <li v-for="toy in toysForDisplay" :key="toy._id">
                  <toys-preview :toy="toy"></toys-preview>
                  <div class="btns">
                       <button @click="$emit('deleted' ,toy._id)" title="Delete">X</button>
                       <button> <router-link :to="'/toy/'+toy._id" title="More details">...</router-link></button>
                       <button><router-link :to="'/toy/edit/'+toy._id" title="Edit/Add">✎</router-link></button>
                  </div>
             </li>
        </ul>
</section>
</template>

<script>
import toysPreview from "../components/toy-preview-cmp.vue";

export default {
  name: "ToysList",

  data() {
    return {};
  },

  created() {
    this.loadToys();
  },
  mounted() {},
  methods: {
    loadToys() {
      this.$store.dispatch({ type: "loadToys" });
    },

    toggleUpdateForm() {
      this.showUpdateForm = !this.showUpdateForm;
    },

    setFilter(ev) {
      this.$store.commit({
        type: "setFilter",
        filterBy: { txt: ev.target.value }
      });
    }
  },
  computed: {
    toysForDisplay() {
      return this.$store.getters.toysForDisplay;
    }

    // toysAreLoading() {
    //   return this.$store.state.todoModule.toysLoading;
    // }
  },
  components: {
    toysPreview
  }
};
</script>


<style scoped lang="scss">
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

.filter{
  margin: 10px;
}

input{
  padding: 5px;
}
</style>
