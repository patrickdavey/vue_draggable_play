<template>
  <div id="arrange" v-on:end="end">
    <h1>Arrange</h1>
    <div class="fluid container">
      <div class="row">
        <div class="col-md-3 tree-container">
          <part-container :end="end" parent-hierarchy="root" :container="rootContainer" @end="end" />
        </div>
        <div class="col-md-9">
          <selected-node></selected-node>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import PartContainer from "./Part-Container.vue";
import SelectedNode from "./Selected-Node.vue";

export default {
  name: "arrange",
  components: {
    PartContainer,
    SelectedNode
  },
  computed: {
    rootContainer () {
      return this.$store.state.nodes[this.$store.state.rootNodeId];
    },

    jsonString () {
      return JSON.stringify(this.$store.state.nodes, null, 2);
    }
  },

  methods: {
    end: function () {
      console.log("arrange end");
    }
  }
};
</script>

<style scoped>
  .options {
    width: 250px;
    border: 1px black solid;
  }

</style>
