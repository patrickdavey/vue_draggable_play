<template>
  <div :class="classObject">
    {{ name }}
  </div>
</template>

<script>

export default {
  name: "document-problem",
  props: ["problem"],
  computed: {
    name: function () {
      return `${this.problem.type}-${this.problem.id}-${this.problem.order}`;
    },
    type: function () {
      return "document-problem";
    },
    classObject () {
      return {
        "selected": (this.problem.id === this.$store.state.selectedNodeId)
      };
    }
  }
};

</script>

<style>
  .selected {
    color: red;
  }
</style>
