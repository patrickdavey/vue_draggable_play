

<template>
  <div>
    <i class="indicator glyphicon glyphicon-folder-open"></i>{{displayName}}
  </div>
</template>

<script>

export default {
  name: "folder-title",
  props: ["part", "currentHierarchy"],
  computed: {
    order: function () {
      return this.part.order;
    },
    name: function () {
      return this.part.name;
    },
    displayName () {
      if (this.name) {
        return this.name;
      } else {
        return `Part${this.currentHierarchy}${this.order}`;
      }
    }
  }
};

</script>
