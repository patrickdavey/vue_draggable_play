import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nodes: [],
    rootNodeId: null,
    selectedNodeId: null,
    treeContext: {
      active: false,
      x: null,
      y: null
    }
  },
  mutations: {
    SET_INITIAL_DATA: (state, { initNodes, rootId }) => {
      state.nodes = initNodes;
      state.rootNodeId = rootId;
      state.selectedNodeId = rootId;
    },

    SET_CONTEXT_ACTIVE: (state, { nodeId, x, y }) => {
      state.treeContext.active = true;
      state.treeContext.nodeId = nodeId;
      state.treeContext.x = x;
      state.treeContext.y = y;
    },

    HIDE_CONTEXT_MENU: (state) => {
      state.treeContext.active = false;
    },

    SET_NODES_FOR_CONTAINER: (state, { containerID, nodes }) => {
      state.nodes[containerID].nodes = nodes;
      _.each(nodes, function (nodeId, index) {
        state.nodes[nodeId].order = index;
      });
    },

    SET_SELECTED_NODE: (state, selectedNodeId) => {
      state.selectedNodeId = selectedNodeId;
    },

    UPDATE_PART_PROPERTY: (state, { nodeId, property, value }) => {
      state.nodes[nodeId][property] = value;
    }
  }
});

window.VueStore = store;
export default store;
