<template>
    <header class="bold-font">

        <div id="nav">
            <div class="logo">
                <router-link :to="'/'">
                    <!-- <h1 class="logo">WeRent</h1> -->
                    <h1 class="logo">
                      <img src="/img/logo.jpg">
                    </h1>
                </router-link>
            </div>
            <div class="d-flex">
              <div class="links" :style="{open: isOpen}" >
                <ul>
                  <li><a v-if="user" @click="logOut">Log Out</a> | </li>
                  <li><a v-if="!user" href="#register" @click.prevent="open">Sign in | </a> </li>
                  <li><router-link to="/about">About</router-link> |</li>
                  <li><router-link to="/item">Items</router-link> </li>
                  </ul>
              </div>
                  <router-link :to="'/user/'+user._id" v-if="user">
                      <div class="user-pic" :style="{backgroundImage: `url(${user.image})`}"></div>
                  </router-link>
            </div>
            <div class="hamburger" :style="{open: isOpen}" @click="toggleMenu"></div>
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
      isActive: false,
      isOpen: false
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
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  },
  components: {
    signIn
  }
};
</script>

<style scoped lang="scss">
#nav {
  padding: 0 20px;
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
  a:hover,
  .logo:hover {
    color: #ccc;
  }
  // background-color: #ccc;
  // background-color: #162044;
  background-color: #eeeeee;

  .logo {
    color: #00d8ae;
    padding: 0 10px;
  }

  .logo img {
    width: 100px;
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

  @media (max-width: 740px) {
    .hamburger {
      padding-right: 10px;
      top: 0;
      display: flex;
      align-items: center;
      border: none;
      z-index: 2;
    }

    .hamburger::after {
      content: "\2630";
      font-size: 30px;
    }

    .open.hamburger::after {
      content: "\2715";
      font-size: 30px;
    }

    .links {
      position: relative;
      display: none;
    }

    .links.open {
      padding: 0;
      display: block;
      position: relative;
      text-align: center;
      z-index: 2;
      top: 0;
      transform: translate(100%, 0);
      transition: all 0.8s;
    }

    a {
      text-decoration: none;
      color: white;
      display: block;
      padding: 0;
    }
    // .active {
    //   box-shadow: none;
    //   color: white;
    // }

    // .nav-list li:not(:last-child) {
    //   border: 2px solid rgba(102, 102, 102, 0.5);
    //   background: grey;
    //   border-bottom: none;
    // }

    // .nav-list li:last-child {
    //   border: 2px solid rgba(102, 102, 102, 0.5);
    //   background: grey;
    // }

    .logo {
      padding-right: 20px;
    }

    // .modal-contant {
    //   width: 100%;
    // }
  }
}
</style>
