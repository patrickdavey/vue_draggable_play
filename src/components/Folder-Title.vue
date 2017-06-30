

<template>
  <div>
    <i class="indicator glyphicon glyphicon-folder-open"></i>Part<slot></slot>{{order}}
  </div>
</template>

<script>

export default {
  name: "folder-title",
  props: ["part"],
  computed: {
    order: function () {
      return this.part.order;
    },
    name: function () {
      return this.part.name;
    }
  }
};

</script>
