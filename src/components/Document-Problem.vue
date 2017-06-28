<template>
  <div>
    {{ name }}
  </div>
</template>

<script>

export default {
  name: "document-problem",
  props: ["problem"],
  computed: {
    name: function () {
      return `${this.problem.type}-${this.problem.id}`;
    },
    type: function () {
      return "document-problem";
    }
  }
};

</script>
