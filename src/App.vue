<template>
  <div id="app">
    <!-- <div id="nav">
      <div class="logo">
        <h1 class="logo">WeRent</h1>
        </div>
        <div class="links">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/item">items</router-link>
     </div>
    </div> -->
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>

import navBar from './components/navBar.vue'
export default {
components:{
  navBar
 }
}
</script>
<style lang="scss">

#app {
font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  //  box-shadow: inset 0 -6px 0 #1e1e1e;
  a {
    font-weight: bold;
    // color: #2c3e50;
    color: #00d8ae;
    &.router-link-exact-active {
      color: #00d8ae;
    }
  }
  a:hover{
    color: #ccc
  }
  // background-color: #ccc;
  background-color: #162044;

  .logo{
    color: #00d8ae;
  }

}
</style>
