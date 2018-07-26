<template>

    <header>
         <div id="nav">
      <div class="logo">
        <h1 class="logo">WeRent</h1>
        </div>
        <div class="links">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/item">items</router-link>
     </div>
    </div>
      </header>
</template>

<script >
export default {
    name: "navBar"
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
    padding: 0 10px;
  }

  .links{
    align-self: center;
    padding: 0 10px;
  }
}


</style>
