// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "es6-promise/auto";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import normalizedData from "./initial_state";
/* eslint-disable no-new */
new Vue({
  store,
  el: "#app",
  template: "<App/>",
  components: { App },
  created () {
    store.commit("SET_INITIAL_DATA", { initNodes: normalizedData.entities.nodes, rootId: normalizedData.result });
  }
});
