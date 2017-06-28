<template>
  <div id="arrange" v-on:end="end">
    <h1>Arrange</h1>
    <div class="fluid container">
      <div class="row">
        <div class="col-md-6">
          <part-container :end="end" :container="rootContainer" @end="end" />
        </div>
        <div class="col-md-6">
          <selected-node></selected-node>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <pre>{{ jsonString }}</pre>
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
