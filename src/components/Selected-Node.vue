<template>
  <div>
    <problem-form :problem="node" v-if="node.image"></problem-form>
    <div v-else-if="problemContainer">
      <button-group v-model="layout">
         <radio selected-value="grid">Grid</radio>
         <radio selected-value="list">List</radio>
         <radio selected-value="part">Part</radio>
      </button-group>

      <template v-if="showProblems">
        <draggable element="ul" :id="containerId" v-model="children" class="problem-container grid clearfix" :move="move" :options="{group:'people'}">
          <li :class="layout" v-for="child in children">
            <div class="well">
              <img :src="child.image">
            </div>
          </li>
        </draggable>
      </template>
      <template v-else>
        <part-form :part="node"></part-form>
      </template>
    </div>
    <div v-else>
      <part-form :part="node"></part-form>
    </div>
  </div>
</template>

<script>

import draggable from "vuedraggable";
import radio from "vue-strap/src/radio";
import buttonGroup from "vue-strap/src/buttonGroup";
import PartForm from "./Part-Form.vue";
import ProblemForm from "./Problem-Form.vue";

export default {
  name: "selected-node",
  components: { draggable, radio, buttonGroup, PartForm, ProblemForm },
  data () {
    return {
      layout: "grid"
    };
  },

  computed: {
    node () {
      return this.$store.state.nodes[this.$store.state.selectedNodeId];
    },
    showProblems () {
      return this.layout === "grid" || this.layout === "list";
    },
    containerId () {
      return `grid-node-${this.node.id}`;
    },
    problemContainer () {
      let isContainer = this.node.type.match(/container/);
      let hasChildren = this.children.length > 0;
      return isContainer && hasChildren && this.children[0].type === "document-problem";
    },

    children: {
      get () {
        if (this.node.nodes) {
          return this.node.nodes.map((nodeId) => this.$store.state.nodes[nodeId]);
        } else {
          return [];
        }
      },
      set (value) {
        // value is the new list, but we just want to persist updated ids.
        let newOrder = value.filter(function (n) { return n !== undefined; }).map(function (v) { return v.id; });
        this.$store.commit("SET_NODES_FOR_CONTAINER", {
          containerID: this.node.id,
          nodes: newOrder
        });
      }
    }
  },

  methods: {
    move (evt) {
      let related = evt.to.getAttribute("class");
      let draggedId = evt.from.getAttribute("id");
      let relatedId = evt.to.getAttribute("id");

      if (related.match(/problem-container/) && draggedId === relatedId) {
        return true; // then we are dragging around within ourself
      } else if (related.match(/normal-container/) && related.match(/no-children/)) {
        return true; // must be in the tree somewhere
      } else if (related.match(/problem-container/) && draggedId.replace("grid-node", "tree-node") !== relatedId) {
        return true;
      }

      return false;
    }
  }
};

</script>

<style lang="scss">
  li.list {
    list-style: none;
  }

  ul.grid {
    padding-left: 0px;
    margin-top: 20px;

    li {
      margin-left: 0px;
      margin-right: 15px;

      .well {
        height: 120px;
      }

      &.list .well {
        height: auto;
      }
    }
  }

  li.grid {
    list-style: none;
    float: left;
    width: 174px;
    height: 120px;

    &.sortable-ghost {
      float: left;
    }

    img {
      max-width: 100%;
      height: auto;
    }

  }
</style>
