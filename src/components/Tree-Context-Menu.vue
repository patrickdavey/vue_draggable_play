<template>
  <div
    v-show="isVisible"
    class="lil-context-menu"
    :style="style"
    tabindex="-1"
    @blur.self="close"
    @contextmenu.capture.prevent>
      <div>blah</div>
      <div>wibblej</div>
      <div>
        <button class="btn btn-default">Create a child</button>
      </div>
  </div>
</template>

<script>

import Vue from "vue";
export default {
  name: "tree-context-menu",
  computed: {
    style () {
      return this.isVisible ? {
        top: this.y + "px",
        left: this.x + "px"
      } : {};
    },
    x () {
      return this.$store.state.treeContext.x;
    },
    y () {
      return this.$store.state.treeContext.y;
    },
    isVisible () {
      return this.$store.state.treeContext.active;
    }
  },
  watch: {
    isVisible () {
      if (this.isVisible) {
        Vue.nextTick(() => this.$el.focus());
      }
    }
  },
  methods: {
    close (evt) {
      this.$store.commit("HIDE_CONTEXT_MENU");
    }
  }
};
</script>

<style scoped>
.lil-context-menu {
  position: absolute;
  background-color: black;
  z-index: 999;
  color: white;
  width: 150px;
  height: 200px;
}
.lil-context-menu:focus {
  outline: none;
}
</style>
