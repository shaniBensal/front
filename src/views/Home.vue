<template>
  <div class="home-container">
    <div class="main-pic">
      <br>
      <br>
    </div>
    <div class="main-title">Rent-o-matic</div>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum adipisci illum corporis unde repellendus culpa ipsam architecto ad ducimus, et sunt, dicta aperiam iure magni? Fugiat ullam ipsum reiciendis quam.</p>
  </div>
</template>



<script>
    // <img class="main-pic" src="https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>

<style>
.main-pic {
background-image:url("https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg");
background-repeat: no-repeat;
background-size: 100%;
background-position-y: 25%;
height: 340px;
padding: 0;
margin: 0;
display: block;
}

.main-title {
height: 80px;
padding: 0;
margin: 0;
font-size: 2.5em;
}

</style>