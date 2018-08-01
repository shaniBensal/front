<template>
    <header class="bold-font">

        <div id="nav">
            <div class="logo">
                <router-link :to="'/'">
                    <h1 class="logo">WeRent</h1>
                </router-link>
            </div>
            <div class="profile">
                <label v-if="user">{{user.name}} |</label>
                <router-link :to="'/user/'+user._id" v-if="user">My profile</router-link>
            </div>
            <div class="links">
                <a v-if="user" @click="logOut">log Out</a>
                |
                <a v-if="!user" href="#register" @click.prevent="open">Sign in | </a>
                <!-- <router-link  v-if="!user" to="/signIn">Sign In</router-link> | -->
                <router-link to="/about">About</router-link> |
                <router-link to="/item">items</router-link>
                <router-link :to="'/user/'+user._id" v-if="user">
                    <div class="user-pic" :style="{backgroundImage: `url(${user.image})`}"></div>
                </router-link>
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
      this.$router.push("/");
    },
    open() {
      this.isActive = true;
    },
    closeModal() {
      if (this.isActive) this.isActive = false;
      else return;
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
  align-items: center;
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
  a:hover, .logo:hover {
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

  .user-pic {
  width: 50px;
  height: 50px;
  border-radius: 30%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

  // .profile{

  // }
}
</style>
