<template>
  <div>
    <img v-if="node.image" :src="node.image">
    <div v-else-if="problemContainer">
      <draggable element="ul" :id="containerId" v-model="children" class="problem-container grid" :move="move" :options="{group:'people'}">
        <li v-for="child in children">
          <img :src="child.image">
        </li>
      </draggable>
    </div>
    <div v-else>
      <p>It"s a container <strong>id: {{node.id}}</strong> of type <strong>{{node.type}}</strong>, and we would allow the user to update directions etc</p>
    </div>
  </div>
</template>

<script>

import draggable from "vuedraggable";

export default {
  name: "selected-node",
  components: { draggable },
  computed: {
    node () {
      return this.$store.state.nodes[this.$store.state.selectedNodeId];
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
