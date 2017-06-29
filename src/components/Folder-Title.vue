

<template>
  <div>
    <i class="indicator glyphicon glyphicon-folder-open"></i>{{displayName}}
  </div>
</template>

<script>

export default {
  name: "folder-title",
  props: ["part", "parentHierarchy"],
  computed: {
    type: function () {
      return this.part.type;
    },
    id: function () {
      return this.part.id;
    },
    order: function () {
      return this.part.order;
    },
    name: function () {
      return this.part.name;
    },
    displayName () {
      if (this.parentHierarchy) {
        return this.name || `Part-${this.parentHierarchy}-${this.order}`;
      } else {
        return this.name || `Part-${this.order}`;
      }
    }
  }
};

</script>
