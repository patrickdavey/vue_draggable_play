<template>
  <div id="app">
    <h1 class="text-center">Draggable Demo</h1>
    <arrange></arrange>
  </div>
</template>

<script>
import Arrange from "./components/Arrange.vue";

export default {
  name: "app",
  components: {
    Arrange
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#app .logo{
  text-align: center;
}
</style>
