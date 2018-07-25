<template>
  
  <div class="item-preview"> 
    
        <img :src="item.images[0]">
        <h3>{{item.name}}</h3>
        <p>{{item.price}}$</p>
    
  </div> 
                 
</template>

<script>
export default {
  name: "ItemPreview",
  props: ["item"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  color: #42b983;
}
img{
    width: 100px;
}
</style>
