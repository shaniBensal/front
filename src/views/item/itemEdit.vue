<template>

    <div class="edit-item">
        <form @submit.prevent="updateItem">
            <label>Item name:
                <input type="text" v-model="itemToUpdate.title" placeholder="add item name..">
            </label>
            <label>Item price:
                <input type="text" v-model="itemToUpdate.price">$
            </label>
            Short description
            <textarea v-model="itemToUpdate.description"></textarea>
            <label>Select item category:
                <select v-model="itemToUpdate.category">
                    <option v-for="(category,idx) in categories" value=idx :key="idx">{{categories[idx]}}</option>
                </select>
            </label>
            <!-- <v-flex xs12 sm6 d-flex>
               <v-select
                  :items="categories"
                     solo
                     value="itemToUpdate.category"
                     label="category"
                ></v-select>
                    </v-flex> -->


            <button>Save</button>
        </form>

        <img :src="itemToUpdate.images[0]">
    </div>
</template>
<script>
export default {
  name: "edit",

  data() {
    return {
      itemToUpdate: {
        _id: null,
        title: "",
        category: "",
        description: "",
        price: "",
        images: []
      },
      categories: ["a", "b"],
      user: {
        _id: null,
        name: ""
      }
    };
  },

  created() {
    const itemId = this.$route.params.id;
    console.log(itemId);
    this.getLoggedInUser();
    this.getCategories();
    if (itemId) {
      this.loadItem(itemId);
    } else return;
  },

  mounted() {},

  methods: {
    updateItem() {
      const itemId = this.$route.params.id;
      if (itemId) {
        console.log("updating item", this.itemToUpdate);
        this.$store
          .dispatch({ type: "updateItem", item: this.itemToUpdate })
          .then(item => {
            this.itemToUpdate = this.getEmptyItem;
            this.$router.push("/user/" + this.user._id);
          });
      } else {
        this.$store
          .dispatch({ type: "addNewItem", item: this.itemToUpdate })
          .then(item => {
            // this.$emit("updated", this.todoToUpdate);
            this.itemToUpdate = this.getEmptyItem;
            this.$router.push("/user/" + this.user._id);
          });
      }
    },

    loadItem(itemId) {
      console.log("aaaaaaaa", itemId);
      this.$store.dispatch({ type: "loadItemById", itemId }).then(item => {
        this.itemToUpdate = { ...item };
      });
    },
    getLoggedInUser() {
      this.user = this.$store.getters.loggedinUser;
      console.log("logged in as", this.user);
    },

    getEmptyItem() {
      return (itemToUpdate = {
        _id: null,
        title: "",
        category: "",
        description: "",
        price: "",
        images: []
      });
    },
    getCategories() {
      this.categories = this.$store.getters.categories;
      console.log("categories:", this.categories);
    }
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.edit-item {
  width: 50vw;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input,
select {
  border: 1px solid black;
  margin: 10px;
  padding: 5px;
}

.select-category{
    display: flex;
}
</style>
