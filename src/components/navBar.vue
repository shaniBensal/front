<template>
    <header>
        <div id="nav">
            <div class="logo">
                <h1 class="logo">WeRent</h1>
            </div>
            <label v-if="user">{{user.name}}</label>
            <div class="links">
                <a v-if="user" @click="logOut">log Out</a> |
                  <a  v-if="!user" href="#register" @click.prevent= "open">Register</a>
                <!-- <router-link  v-if="!user" to="/signIn">Sign In</router-link> | -->
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <router-link to="/item">items</router-link> 
            </div>
        </div>
        <div>
          <sign-in v-bind:class="{ active: isActive }" @close="closeModal"></sign-in>
    </div>
    </header>
</template>

<script>
import signIn from "./signIn.vue";

export default {
  name: "navBar",
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch({ type: "logOut" });
    },
    open() {
      this.isActive = true;
    },
    closeModal(){
      this.isActive = false;
    }
  },
  components: {
    signIn
  }
};
</script>

<style scoped lang="scss">
#nav {
  padding: 20px;
  margin: 0;
  display: flex;
  color: #00d8ae;
  justify-content: space-between;
  //   box-shadow: inset 0 -6px 0 #1e1e1e;

  a {
    font-weight: bold;
    color: #2c3e50;
    color: #00d8ae;
    text-decoration: none;
    cursor: pointer;
    &.router-link-exact-active {
      color: #00d8ae;
    }
  }
  a:hover {
    color: #ccc;
  }
  // background-color: #ccc;
  background-color: #162044;

  .logo {
    color: #00d8ae;
    padding: 0 10px;
  }

  .links {
    align-self: center;
    padding: 0 10px;
  }
}
</style>
