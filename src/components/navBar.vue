<template>
    <header>
        <nav class="d-flex nav-bar-main" :class="{ open: display }">
            <div class="logo">
                <router-link :to="'/'">
                    <h1 class="logo">
                        <img src="/img/werent_logo.png">
                    </h1>
                </router-link>
            </div>
            <ul class="d-flex align-center clean-list"> 
                <li>
                    <a v-if="user" @click="logOut">Log Out </a>
                    <a v-else href="#register" @click.prevent="open" class="sign-in"></a>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
                <li>
                    <router-link to="/item">Check our store</router-link>
                </li>
                <li>
                    <router-link :to="'/user/'+user._id" v-if="user">
                        <div class="user-pic" :style="{backgroundImage: `url(${user.image})`}"></div>
                    </router-link>
                </li>
            </ul>
                <div class="hamburger" @click="display = !display" :class="{ exit: display }"></div>
                    <sign-in :class="{ active: isActive }" @close="closeModal"></sign-in>
        </nav>
    </header>
</template>
<script>
import signIn from "./signIn.vue";

export default {
  name: "navBar",
  data() {
    return {
      isActive: false,
      isOpen: false,
      display: false
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
.hamburger {
  display: none;
  color: #1da088;
}

nav {
  height: 100px;
  background-color: #eeeeee;
  justify-content: space-between;
}
.clean-list a {
  margin: 0px 20px;
  text-decoration: none;
  color: #2c3e50;
  color: #1da088;
}

.clean-list .router-link-active {
  color: #2c3e50;
}

.clean-list a:hover {
  color: #2c3e50;
}

.logo {
  color: #1da088;
  padding: 10px;
}

.logo img {
  width: 90px;
}

.space-around {
  justify-content: space-around;
}
.links {
  padding-right: 20px;
  margin-right: 30px;
  align-items: center;
  text-align: center;
}

.user-pic {
  width: 50px;
  height: 50px;
  border-radius: 30%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.sign-in::after {
  content: "Sign in";
}

// #nav {
//   padding: 0 20px;
//   margin: 0;
//   display: flex;
//   color: #1da088;
//   justify-content: space-between;
//   align-items: center;
//   //   box-shadow: inset 0 -6px 0 #1e1e1e;

//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     color: #1da088;
//     text-decoration: none;
//     cursor: pointer;
//     &.router-link-exact-active {
//       color: #1da088;
//     }
//   }
//   a:hover,
//   .logo:hover {
//     color: #ccc;
//   }
//   // background-color: #ccc;
//   // background-color: #162044;
//   background-color: #eeeeee;

.nav-bar-main li {
  color: #1da088;
}

@media (max-width: 540px) {
  // .clean-list li:first-child {
  //   margin: 80px 20px 20px 20px;
  // }

  .clean-list li:first-child {
    display: none;
  }

  .nav-bar-main.open li {
    width: 100%;
    font-size: 1.2em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hamburger {
    cursor: pointer;
    top: 0;
    right: 18px;
    display: flex;
    position: fixed;
    align-items: center;
    padding: 10px;
    color: #1da088;
    border: none;
    z-index: 2;
  }

  .hamburger::after {
    content: "\2630";
    font-size: 30px;
  }

  .exit.hamburger::after {
    content: "\2715";
    font-size: 30px;
  }

  .nav-bar-main ul {
    background-color: #eeeeee;
    right: -140px;
    transition: all 0.8s;
    padding-top:20px;
    // transform: rotateY(90deg);
    opacity: 0;
  }

  .nav-bar-main.open ul {
    position: fixed;
    flex-direction: column;
    top: 0;
    z-index: 2;
    // top: 50;
    right: 20px;
    width: 90vw;
    height: 30vh;
    opacity: 1;
  }
}
</style>
