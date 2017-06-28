import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nodes: [],
    rootNodeId: null,
    selectedNodeId: null
  },
  mutations: {
    SET_INITIAL_DATA: (state, { initNodes, rootId }) => {
      state.nodes = initNodes;
      state.rootNodeId = rootId;
      state.selectedNodeId = rootId;
    },

    SET_NODES_FOR_CONTAINER: (state, { containerID, nodes }) => {
      state.nodes[containerID].nodes = nodes;
    },

    SET_SELECTED_NODE: (state, selectedNodeId) => {
      state.selectedNodeId = selectedNodeId;
    }
  }
});

window.VueStore = store;
export default store;
