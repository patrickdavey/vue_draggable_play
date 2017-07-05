

<template>
  <div :class="classObject">
    <i class="indicator glyphicon" :class="folderStyle"></i>{{displayName}}
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
    },
    classObject () {
      return {
        "selected": (this.part.id === this.$store.state.selectedNodeId)
      };
    },
    folderStyle () {
      return {
        "glyphicon-folder-close": !this.part.open,
        "glyphicon-folder-open": this.part.open
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
