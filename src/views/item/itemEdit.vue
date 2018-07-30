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
                    <option v-for="(category,idx) in categories" :key="idx">{{categories[idx]}}</option>
                </select>
            </label>

            <div class="upload">
              <img :src="itemToUpdate.images[0]" >
              <input type="file" @change="handleFileUpload($event)" >

            </div>
            
            <button>Save</button>
        </form>

        <!-- <img :src="itemToUpdate.images[0]"> -->
    </div>
</template>
<script>

import cloudinary from '../../services/cloudinaryService.js'
export default {
  name: "edit",

  data() {
    return {
      itemToUpdate: {
        _id: null,
        category: [],
        title: "",
        description: "",
        ranking: {
          count: 1.0,
          avg: 4.0
        },
        price: "",
        dateCreated: "",
        keyWords: [],
        ownerId: "",
        occupiedDates: [],
        images: []
      },

      imgUrl: "",
      fileUpload: ""
    };
  },

  created() {
    const itemId = this.$route.params.id;
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
            this.itemToUpdate = this.getEmptyItem();
            this.$router.push("/user/" + this.user._id);
          });
      }
    },

    handleFileUpload(ev) {
      console.log("event", ev);
      this.fileUpload = ev.target.files[0].baseURI;
      console.log(this.fileUpload);

      cloudinary.cloudinary.uploader.upload(
        this.fileUpload,
        { crop: "limit", tags: "samples", width: 3000, height: 2000 },
        function(result) {
          console.log(result);
        }
      );
    },

    loadItem(itemId) {
      this.$store.dispatch({ type: "loadItemById", itemId }).then(item => {
        this.itemToUpdate = { ...item };
      });
    },

    getEmptyItem() {
      return {
        _id: null,
        category: [],
        title: "",
        description: "",
        ranking: {
          count: 1.0,
          avg: 4.0
        },
        price: "",
        dateCreated: "",
        keyWords: [],
        ownerId: "",
        occupiedDates: [],
        images: []
      };
    },
    getCategories() {
      this.categories = this.$store.getters.categories;
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    }
  }
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

.select-category {
  display: flex;
}
</style>
